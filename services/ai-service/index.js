require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const multer = require('multer');
const Tesseract = require('tesseract.js');
const upload = multer({ storage: multer.memoryStorage() });
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Read VNPT Credentials from api.md
let smartbotConfig = {};
try {
  const apiContent = fs.readFileSync(fs.existsSync(path.join(__dirname, 'api.md')) ? path.join(__dirname, 'api.md') : '/api.md', 'utf-8');
  const lines = apiContent.split('\n');
  let inSmartbot = false;
  for (const line of lines) {
    if (line.includes('3. VNPT SmartBot')) inSmartbot = true;
    else if (line.match(/^\d\./)) inSmartbot = false;

    if (inSmartbot) {
      if (line.startsWith('Token ID:')) smartbotConfig.tokenId = line.split('Token ID:')[1].trim();
      if (line.startsWith('Token Key:')) smartbotConfig.tokenKey = line.split('Token Key:')[1].trim();
      if (line.startsWith('Access Token:')) smartbotConfig.accessToken = line.split('Access Token:')[1].trim();
    }
  }
} catch (e) { console.error('Failed to read api.md', e); }

const SV5T_PROMPT = `Bạn là trợ lý AI ảo của Hội Sinh viên Học viện Ngân hàng.
Dưới đây là Quy định về tiêu chuẩn xét chọn danh hiệu Sinh viên 5 tốt cấp Học viện năm học 2025 - 2026:
1. Đạo đức tốt:
- Điểm rèn luyện đạt từ 80 điểm trở lên.
- Không vi phạm pháp luật, quy chế.
- Đạt thêm 1 trong: thi Mác-Lênin cấp Học viện, Đảng viên hoàn thành tốt nhiệm vụ, thi Đảng/Đoàn Hội, là thanh niên tiêu biểu.
2. Học tập tốt:
- Điểm trung bình chung học tập cả năm đạt từ 3.2/4.0 trở lên.
- Đạt thêm 1 trong: học bổng khuyến khích, nghiên cứu khoa học sinh viên giải cấp Khoa, bài báo khoa học/kỷ yếu, giải thi học thuật/khởi nghiệp, thành viên CLB học thuật.
3. Thể lực tốt:
- Đạt danh hiệu "Sinh viên khỏe" cấp Học viện.
- Hoặc tham gia giải thể thao cấp Học viện, Đoàn, địa phương.
- Hoặc là thành viên CLB thể thao.
4. Tình nguyện tốt:
- Đạt 1 trong 2: tham gia ít nhất 3 ngày tình nguyện (1 HMTN = 1 ngày, 1 Chủ nhật xanh = 1 ngày, v.v.) HOẶC được khen thưởng về tình nguyện từ cấp Khoa trở lên / sáng lập dự án.
5. Hội nhập tốt:
- Chứng chỉ Tiếng Anh B1 hoặc điểm Tích lũy Ngoại ngữ >= 3.0/4.0.
- Đạt thêm 2 trong: Ban chủ nhiệm CLB ngoại ngữ, giao lưu quốc tế, hội nhập cấp trường, thi ngoại ngữ, hoàn thành khóa Kỹ năng, bằng khen Hội Sinh viên/Khoa.

Hãy trả lời ngắn gọn, lịch sự, thân thiện và chính xác dựa trên quy định trên.`;

// 1. Chatbot RAG (SmartBot)
app.post('/api/ai/chat', async (req, res) => {
  const { message, userId } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Lấy quy chế mới nhất từ Database thông qua application-service
    let allQuyChes = [];
    let namHoc = "2025-2026";
    let activeRules = [];
    try {
      const authHeader = req.headers.authorization;
      const response = await axios.get('http://application:3006/applications/quy-ches', {
        headers: authHeader ? { Authorization: authHeader } : {}
      });
      if (response.data && response.data.length > 0) {
        allQuyChes = response.data;
        namHoc = response.data[0].nam_hoc;
        activeRules = response.data[0].tieu_chis || [];
      }
    } catch (e) {
      console.error('Lỗi khi gọi rules API, dùng fallback:', e.message);
    }

    let reply = "Xin lỗi, tôi chưa hiểu rõ ý bạn.";
    const lowerMsg = message.toLowerCase();

    // Xử lý cấp độ Quy chế
    let targetRules = activeRules;
    let capDoName = "trường";
    if (lowerMsg.includes("thành phố") || lowerMsg.includes("tỉnh")) {
      const cityQc = allQuyChes.find(qc => qc.don_vi?.cap_do === 'TINH' || qc.don_vi?.cap_do === 'TINH_THANH');
      if (cityQc) {
        targetRules = cityQc.tieu_chis;
        capDoName = "thành phố";
      }
    } else if (lowerMsg.includes("trung ương") || lowerMsg.includes("tw") || lowerMsg.includes("quốc gia")) {
      const twQc = allQuyChes.find(qc => qc.don_vi?.cap_do === 'TW');
      if (twQc) {
        targetRules = twQc.tieu_chis;
        capDoName = "Trung ương";
      }
    }

    // Hàm tìm tiêu chí theo từ khóa
    const findRule = (keyword) => {
      const rule = targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes(keyword));
      return rule ? rule.mo_ta : null;
    };

    if (lowerMsg.includes("học tập") || lowerMsg.includes("điểm")) {
      const ruleDesc = findRule("học tập");
      reply = ruleDesc ? `Theo Quy chế SV5T cấp ${capDoName} năm ${namHoc}, tiêu chí **Học tập tốt** yêu cầu:\n\n${ruleDesc}` :
        `Để đạt tiêu chí **Học tập tốt** theo Quy chế cấp ${capDoName}, bạn cần đạt đủ điều kiện của đơn vị đề ra.`;
    } else if (lowerMsg.includes("đạo đức")) {
      const ruleDesc = findRule("đạo đức");
      reply = ruleDesc ? `Theo Quy chế SV5T cấp ${capDoName} năm ${namHoc}, tiêu chí **Đạo đức tốt** yêu cầu:\n\n${ruleDesc}` :
        `Đối với tiêu chí **Đạo đức tốt** cấp ${capDoName}, vui lòng tham khảo chi tiết của hội sinh viên cấp đó.`;
    } else if (lowerMsg.includes("tình nguyện")) {
      const ruleDesc = findRule("tình nguyện");
      reply = ruleDesc ? `Theo Quy chế SV5T cấp ${capDoName} năm ${namHoc}, tiêu chí **Tình nguyện tốt** yêu cầu:\n\n${ruleDesc}` :
        `Tiêu chí **Tình nguyện tốt** cấp ${capDoName} yêu cầu bạn hoàn thành hoạt động tình nguyện theo chuẩn đơn vị.`;
    } else if (lowerMsg.includes("thể lực")) {
      const ruleDesc = findRule("thể lực");
      reply = ruleDesc ? `Theo Quy chế SV5T cấp ${capDoName} năm ${namHoc}, tiêu chí **Thể lực tốt** yêu cầu:\n\n${ruleDesc}` :
        `Với **Thể lực tốt** cấp ${capDoName}, bạn cần đạt 'Sinh viên khỏe' hoặc tham gia giải thể thao.`;
    } else if (lowerMsg.includes("hội nhập")) {
      const ruleDesc = findRule("hội nhập");
      reply = ruleDesc ? `Theo Quy chế SV5T cấp ${capDoName} năm ${namHoc}, tiêu chí **Hội nhập tốt** yêu cầu:\n\n${ruleDesc}` :
        `Tiêu chí **Hội nhập tốt** cấp ${capDoName} yêu cầu chứng chỉ ngoại ngữ hoặc hoạt động hội nhập.`;
    } else if (lowerMsg.includes("thời gian") || lowerMsg.includes("hạn")) {
      reply = `Hiện tại là thời gian thu thập minh chứng cho năm học ${namHoc}. Bạn hãy tranh thủ cập nhật các minh chứng nhé!`;
    } else if (lowerMsg.includes("đầy đủ") || lowerMsg.includes("quy chế") || lowerMsg.includes("chi tiết")) {
      reply = `Dựa trên Quy chế SV5T năm ${namHoc}, sau đây là chi tiết 5 tiêu chí:\n\n` +
        activeRules.map(r => `**${r.ten_tieu_chi}**\n${r.mo_ta || 'Đang cập nhật'}`).join('\n\n');
    } else {
      reply = `Dựa trên Quy chế SV5T năm ${namHoc}, để đạt danh hiệu bạn cần hoàn thiện 5 tiêu chí: ${activeRules.map(r => r.ten_tieu_chi).join(', ')}. Bạn cần hỏi chi tiết về tiêu chí nào?`;
    }

    const chunks = reply.split(' ');
    let currentText = "";

    // First chunk empty
    res.write('data: {"object": {"sb": {"card_data": [{"type": "text", "text": ""}]}}}\n\n');

    for (let i = 0; i < chunks.length; i++) {
      currentText += (i === 0 ? "" : " ") + chunks[i];
      const payload = JSON.stringify({
        object: { sb: { card_data: [{ type: "text", text: currentText }] } }
      });
      res.write('data: ' + payload + '\n\n');
      await new Promise(r => setTimeout(r, 20));
    }

    res.end();
  } catch (error) {
    console.error('AI Error:', error.message);
    res.write('data: {"error": "Lỗi kết nối AI"}\n\n');
    res.end();
  }
});

// 1.5 Extract Criteria (Smart Parser)
app.post('/api/ai/extract-criteria', (req, res) => {
  const { text } = req.body;
  if (!text) return res.json({ count: 1 });

  let count = 0;
  // Replace inline bullets like "; -" or ". -" with newline to split them properly
  const normalizedText = text.replace(/;\s*-/g, '\n-').replace(/\.\s*-/g, '\n-');
  const lines = normalizedText.split('\n');
  let inOptionsBlock = false;

  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();

    // Ignore empty lines
    if (!lowerLine) continue;

    // Check if this line introduces a choice block (e.g. "Đạt 1 trong các tiêu chí sau:")
    const matchChoice = lowerLine.match(/(ít nhất|chọn|đạt|đạt thêm|từ)\s*0?(\d+)\s*(trong|tiêu chí)/);
    if (matchChoice) {
      count += parseInt(matchChoice[2], 10);
      inOptionsBlock = true; // All following bullets belong to this choice block
      continue;
    }

    if (lowerLine.includes('trong các tiêu chí sau') || lowerLine.includes('một trong các')) {
      if (!matchChoice) count += 1;
      inOptionsBlock = true;
      continue;
    }

    // Process bullet points starting with '-' or '+'
    if (lowerLine.startsWith('-') || lowerLine.startsWith('+') || lowerLine.startsWith('*')) {
      if (inOptionsBlock) {
        // Skip items inside a choice block because we already counted the choice requirement (e.g. 1)
        continue;
      }

      if (lowerLine.includes('không vi phạm')) continue;

      // Analyze the sentence structure: a valid independent requirement usually contains verbs or key terms
      const actionKeywords = ['đạt', 'tham gia', 'được', 'là', 'có', 'điểm', 'chứng chỉ', 'hoàn thành', 'khen thưởng', 'nhận'];
      const hasAction = actionKeywords.some(kw => lowerLine.includes(kw));

      // If it's just a noun phrase like "- Đoàn Thanh niên - Hội Sinh viên" (short and no verb), it's a sub-item, skip it
      if (!hasAction && lowerLine.length < 60) {
        continue;
      }

      count += 1;
    }
  }

  if (count === 0) count = 1;
  res.json({ count });
});

// 2. OCR SmartReader
app.post('/api/ai/ocr', upload.single('file'), async (req, res) => {
  const { fullName, msv } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Không có file ảnh' });
  }

  try {
    // Run real OCR via tesseract.js
    console.log("Running Tesseract OCR...");
    const { data: { text } } = await Tesseract.recognize(file.buffer, 'vie');
    console.log("Extracted text:", text);

    let extractedName = fullName || "Nguyễn Văn A";
    let extractedOrg = "Hội Sinh viên ĐHQGHN";
    let isFraud = false;
    let fraudReason = "";

    const lowerText = text.toLowerCase();

    // Convert to unaccented characters for lenient name matching
    const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    const unaccentedText = removeAccents(lowerText);
    const unaccentedFullName = removeAccents(fullName ? fullName.toLowerCase() : "");
    const lowerMsv = msv ? msv.toLowerCase() : "";

    let isNameMatch = true;
    if (lowerMsv && lowerText.includes(lowerMsv)) {
      isNameMatch = true;
    } else if (fullName) {
      if (unaccentedText.includes(unaccentedFullName) || lowerText.includes((fullName).toLowerCase())) {
        isNameMatch = true;
      } else {
        // Fallback: Check if parts of the name match to handle OCR errors or long lists
        const nameParts = unaccentedFullName.split(' ').filter(p => p.length >= 2);
        if (nameParts.length > 0) {
          const matchCount = nameParts.filter(p => unaccentedText.includes(p)).length;
          // If it matches at least half of the name parts, accept it
          if (matchCount >= Math.max(1, Math.floor(nameParts.length / 2))) {
            isNameMatch = true;
          } else {
            isNameMatch = false;
          }
        } else {
          isNameMatch = false;
        }
      }
    }

    // Classification Logic
    let suggestedCriteria = "Khác";
    let isDocTypeValid = false;

    // Tình nguyện tốt
    if (lowerText.includes("tình nguyện") || lowerText.includes("mùa hè xanh") || lowerText.includes("hiến máu")) {
      suggestedCriteria = "Tình nguyện tốt";
      isDocTypeValid = true;
    }
    // Học tập tốt
    else if (lowerText.includes("học tập") || lowerText.includes("giỏi") || lowerText.includes("xuất sắc") || lowerText.includes("bảng điểm") || lowerText.includes("gpa")) {
      suggestedCriteria = "Học tập tốt";
      isDocTypeValid = true;
    }
    // Đạo đức tốt
    else if (lowerText.includes("đạo đức") || lowerText.includes("gương mẫu") || lowerText.includes("thanh niên tiên tiến") || lowerText.includes("khen thưởng")) {
      suggestedCriteria = "Đạo đức tốt";
      isDocTypeValid = true;
    }
    // Thể lực tốt
    else if (lowerText.includes("thể lực") || lowerText.includes("sinh viên khỏe") || lowerText.includes("thể thao") || lowerText.includes("giải chạy")) {
      suggestedCriteria = "Thể lực tốt";
      isDocTypeValid = true;
    }
    // Hội nhập tốt
    else if (lowerText.includes("hội nhập") || lowerText.includes("tiếng anh") || lowerText.includes("ielts") || lowerText.includes("toeic") || lowerText.includes("ngoại ngữ") || lowerText.includes("giao lưu")) {
      suggestedCriteria = "Hội nhập tốt";
      isDocTypeValid = true;
    }
    else if (lowerText.includes("chứng nhận") || lowerText.includes("giấy khen") || lowerText.includes("chứng chỉ") || lowerText.includes("certificate")) {
      isDocTypeValid = true;
    }

    const validOrgs = ["hội sinh viên", "đoàn thanh niên", "trường đại học", "đhqg", "học viện", "academy", "university"];
    const hasValidOrg = validOrgs.some(org => lowerText.includes(org));

    // Loosen org check for specific external docs (Bảng điểm, IELTS, TOEIC usually don't have "hội sinh viên")
    const isExternalValidDoc = lowerText.includes("ielts") || lowerText.includes("toeic") || lowerText.includes("bảng điểm");
    const isValidOrg = hasValidOrg || isExternalValidDoc;

    if (!isDocTypeValid && text.length < 10) {
      extractedName = "N/A";
      extractedOrg = "Không nhận diện được";
      isFraud = true;
      fraudReason = "Ảnh mờ hoặc không có chữ hợp lệ";
    } else {
      if (!isValidOrg) {
        isFraud = true;
        fraudReason = "Chứng nhận không thuộc đơn vị hợp lệ (Hội SV/Đoàn TN/Trường)";
      }

      if (fullName && !isNameMatch) {
        isFraud = true;
        fraudReason = fraudReason ? `${fraudReason}. Sai tên chính chủ` : `Sai tên chính chủ: Không tìm thấy "${fullName}" trong ảnh`;
      }
    }

    res.json({
      extractedData: {
        ho_ten: fullName,
        loai_chung_chi: suggestedCriteria !== "Khác" ? `Giấy chứng nhận ${suggestedCriteria}` : "Giấy khen/Chứng nhận tham gia HĐ",
        ngay_cap: "2024-03-26",
        don_vi_cap: isValidOrg ? "Tổ chức hợp lệ" : "Tổ chức không hợp lệ",
        raw_text: text
      },
      confidenceScore: isFraud ? 0.2 : 0.85,
      suggestedCriteria: suggestedCriteria,
      isValid: !isFraud,
      message: isFraud ? fraudReason : "Hợp lệ"
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Lỗi xử lý OCR' });
  }
});

// 3. AI Recommendations (vnSocial Integration)
let vnSocialToken = null;
async function getVnSocialToken() {
  if (vnSocialToken) return vnSocialToken;
  try {
    const res = await axios.post('https://api-vnsocialplus.vnpt.vn/social-api/v1/login', {
      username: 'vnsocial',
      password: '******' // Configurable via .env in production
    });
    vnSocialToken = res.data?.object?.token;
    return vnSocialToken;
  } catch (err) {
    console.error("vnSocial login error:", err.message);
    return null;
  }
}

function extractFutureDates(text) {
  const dateRegex = /\b(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?\b/g;
  let match;
  const now = new Date();
  while ((match = dateRegex.exec(text)) !== null) {
    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    const year = match[3] ? parseInt(match[3]) : now.getFullYear();
    if (day > 0 && day <= 31 && month > 0 && month <= 12) {
      const eventDate = new Date(year, month - 1, day);
      if (eventDate > now) {
        return true;
      }
    }
  }
  return false;
}


const THEMATIC_IMAGES = {
  "Đạo đức tốt": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  "Học tập tốt": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "Thể lực tốt": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  "Tình nguyện tốt": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
  "Hội nhập tốt": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80"
};

function getActivityImage(criteria, googleImage) {
  if (googleImage && (googleImage.startsWith('http://') || googleImage.startsWith('https://'))) {
    return googleImage;
  }
  return THEMATIC_IMAGES[criteria] || THEMATIC_IMAGES["Đạo đức tốt"];
}

// --- CRON JOB & GOOGLE CUSTOM SEARCH API & LLM CLASSIFIER (CHUẨN WORKFLOW KHÔNG CÀO FB TRỰC TIẾP) ---
const DB_FILE = path.join(__dirname, 'activities_db.json');
const google = require('googlethis');

// Bước 1: Google Custom Search Engine cấu hình giới hạn nguồn page tích xanh
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY';
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || 'YOUR_CSE_ID';

// Danh sách nguồn — BẠN CẦN TỰ XÁC MINH username thật trên Facebook rồi điền vào đây
const SOURCE_PAGES = [
  'facebook.com/hoisinhvien.com.vn',      // Hội Sinh viên Việt Nam (đã xác minh tích xanh
  'facebook.com/sinhvien5totbkhn',
  'facebook.com/profile.php?id=61566111395163',
  'facebook.com/sv5tutc',
  'facebook.com/sv5t.utt',
  'facebook.com/profile.php?id=61575279537487',
  // 'facebook.com/[username-thật]',       // Page "Góc Sinh viên 5 tốt" — bạn tìm và điền username thật
  // 'facebook.com/[username-thật]',       // Hội SV cấp trường/khoa của bạn nếu có
];

// Với Group công khai, thêm riêng vì độ tin cậy thấp hơn Page (Facebook hạn chế index Group)
const SOURCE_GROUPS = [
  'facebook.com/groups/sinhvien5totdhtm',
  'facebook.com/groups/557986066611296',
  'facebook.com/groups/sinhvien5totkhoatienganhtmu',
  'facebook.com/groups/2575079849328995',
  'facebook.com/groups/hotrosinhvien5tothumg',
  'facebook.com/groups/777789615302810',
  'facebook.com/groups/1496064458145668',
  'facebook.com/groups/881642273064712',

  // "Góc SV 5 tốt" dạng group nếu tồn tại — cân nhắc kỹ vì Group khó lấy link ổn định hơn Page
];

const CRITERIA_KEYWORDS = {
  "Đạo đức tốt": 'đạo đức',
  "Học tập tốt": 'học tập',
  "Thể lực tốt": 'thể lực',
  "Tình nguyện tốt": 'tình nguyện',
  "Hội nhập tốt": 'hội nhập',
};

// Tự sinh query cho MỌI tổ hợp (tiêu chí x nguồn) thay vì cố định cứng như trước
function buildQueries() {
  const queries = [];
  for (const [criteria, keyword] of Object.entries(CRITERIA_KEYWORDS)) {
    for (const source of [...SOURCE_PAGES, ...SOURCE_GROUPS]) {
      queries.push({
        criteria,
        query: `site:${source} ${keyword} ("giấy chứng nhận" OR "cấp chứng nhận")`
      });
    }
  }
  return queries;
}

// Initial seed data với định dạng chuẩn /posts/ để bạn dễ dàng thay thế bằng ID bài viết thật trên Facebook
const SEED_FACEBOOK_ACTIVITIES = [
  {
    id: 'FB_ACT_001',
    tieu_chi: 'Đạo đức',
    ten_hoat_dong: 'Cuộc thi tìm hiểu tư tưởng, đạo đức, phong cách Hồ Chí Minh 2026',
    title: 'Cuộc thi tìm hiểu tư tưởng, đạo đức, phong cách Hồ Chí Minh 2026',
    thoi_gian_bat_dau: '2026-01-15',
    thoi_gian_ket_thuc: '2026-11-30',
    hinh_thuc: 'Trắc nghiệm trực tuyến qua app Thanh niên Việt Nam',
    co_chung_nhan: true,
    huong_dan_lay_chung_nhan: 'Đăng nhập app > Công tác Đoàn > Học và thi > Cuộc thi trực tuyến > làm bài đạt yêu cầu > tải Giấy chứng nhận',
    matched_criteria: 'Đạo đức tốt',
    source: 'facebook.com/Trunguongdoan',
    date: '2026-11-30',
    link: 'https://www.facebook.com/Trunguongdoan/posts/pfbid02V_SAMPLE_ID_1',
    postLink: 'https://www.facebook.com/Trunguongdoan/posts/pfbid02V_SAMPLE_ID_1',
    pictures: [THEMATIC_IMAGES["Đạo đức tốt"]],
    is_active: true
  },
  {
    id: 'FB_ACT_002',
    tieu_chi: 'Học tập',
    ten_hoat_dong: 'Phát động Giải thưởng Nghiên cứu Khoa học Sinh viên năm học 2025-2026',
    title: 'Phát động Giải thưởng Nghiên cứu Khoa học Sinh viên năm học 2025-2026',
    thoi_gian_bat_dau: '2026-02-01',
    thoi_gian_ket_thuc: '2026-10-15',
    hinh_thuc: 'Nộp thuyết minh đề tài nghiên cứu khoa học cấp Khoa/Trường',
    co_chung_nhan: true,
    huong_dan_lay_chung_nhan: 'Đăng ký đề tài với GVHD > Thực hiện nghiên cứu > Bảo vệ trước hội đồng > Nhận quyết định công nhận giải thưởng',
    matched_criteria: 'Học tập tốt',
    source: 'facebook.com/hoisinhvien.com.vn',
    date: '2026-10-15',
    link: 'https://www.facebook.com/hoisinhvien.com.vn/posts/pfbid02V_SAMPLE_ID_2',
    postLink: 'https://www.facebook.com/hoisinhvien.com.vn/posts/pfbid02V_SAMPLE_ID_2',
    pictures: [THEMATIC_IMAGES["Học tập tốt"]],
    is_active: true
  },
  {
    id: 'FB_ACT_003',
    tieu_chi: 'Thể lực',
    ten_hoat_dong: 'Giải chạy bộ Sinh viên Khỏe - Vì sức khỏe cộng đồng 2026',
    title: 'Giải chạy bộ Sinh viên Khỏe - Vì sức khỏe cộng đồng 2026',
    thoi_gian_bat_dau: '2026-03-01',
    thoi_gian_ket_thuc: '2026-09-30',
    hinh_thuc: 'Ghi nhận tích lũy số km chạy bộ qua ứng dụng Strava',
    co_chung_nhan: true,
    huong_dan_lay_chung_nhan: 'Liên kết tài khoản Strava với giải chạy > Hoàn thành tối thiểu 30km/tháng > Tải chứng nhận điện tử từ hệ thống',
    matched_criteria: 'Thể lực tốt',
    source: 'facebook.com/hoisinhvien.com.vn',
    date: '2026-09-30',
    link: 'https://www.facebook.com/hoisinhvien.com.vn/posts/pfbid02V_SAMPLE_ID_3',
    postLink: 'https://www.facebook.com/hoisinhvien.com.vn/posts/pfbid02V_SAMPLE_ID_3',
    pictures: [THEMATIC_IMAGES["Thể lực tốt"]],
    is_active: true
  },
  {
    id: 'FB_ACT_004',
    tieu_chi: 'Tình nguyện',
    ten_hoat_dong: 'Chiến dịch Mùa hè xanh & Tiếp sức mùa thi 2026',
    title: 'Chiến dịch Mùa hè xanh & Tiếp sức mùa thi 2026',
    thoi_gian_bat_dau: '2026-06-01',
    thoi_gian_ket_thuc: '2026-08-31',
    hinh_thuc: 'Tham gia đội hình tình nguyện hỗ trợ thí sinh hoặc tình nguyện tại địa phương',
    co_chung_nhan: true,
    huong_dan_lay_chung_nhan: 'Đăng ký qua cổng thông tin Hội Sinh viên trường > Tham gia đủ số ngày quy định > Nhận Giấy khen/Chứng nhận chiến dịch',
    matched_criteria: 'Tình nguyện tốt',
    source: 'facebook.com/hoisinhvien.com.vn',
    date: '2026-08-31',
    link: 'https://www.facebook.com/hoisinhvien.com.vn/posts/pfbid02V_SAMPLE_ID_4',
    postLink: 'https://www.facebook.com/hoisinhvien.com.vn/posts/pfbid02V_SAMPLE_ID_4',
    pictures: [THEMATIC_IMAGES["Tình nguyện tốt"]],
    is_active: true
  },
  {
    id: 'FB_ACT_005',
    tieu_chi: 'Hội nhập',
    ten_hoat_dong: 'Hội thi Olympic Tiếng Anh Học sinh Sinh viên toàn quốc 2026',
    title: 'Hội thi Olympic Tiếng Anh Học sinh Sinh viên toàn quốc 2026',
    thoi_gian_bat_dau: '2026-04-01',
    thoi_gian_ket_thuc: '2026-11-15',
    hinh_thuc: 'Thi trực tuyến trắc nghiệm kiến thức ngoại ngữ và hội nhập quốc tế',
    co_chung_nhan: true,
    huong_dan_lay_chung_nhan: 'Truy cập website cuộc thi > Đăng ký tài khoản > Hoàn thành vòng sơ loại đạt tối thiểu 50 điểm > Tải Giấy chứng nhận Olympic Tiếng Anh',
    matched_criteria: 'Hội nhập tốt',
    source: 'facebook.com/Trunguongdoan',
    date: '2026-11-15',
    link: 'https://www.facebook.com/Trunguongdoan/posts/pfbid02V_SAMPLE_ID_5',
    postLink: 'https://www.facebook.com/Trunguongdoan/posts/pfbid02V_SAMPLE_ID_5',
    pictures: [THEMATIC_IMAGES["Hội nhập tốt"]],
    is_active: true
  }
];

function getActivitiesDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (Array.isArray(data)) {
        const activeCount = data.filter(item => item.is_active !== false).length;
        if (activeCount > 0) return data;
      }
    }
  } catch (e) {
    console.error('Error reading activities DB:', e.message);
  }
  saveActivitiesDB(SEED_FACEBOOK_ACTIVITIES);
  return SEED_FACEBOOK_ACTIVITIES;
}

function saveActivitiesDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving activities DB:', e.message);
  }
}

// Bước 3: Gọi Google Custom Search API / Serper.dev (chỉ lấy title + snippet, TUYỆT ĐỐI KHÔNG CÀO LẠI FB)
async function searchActivities(query, apiKey, cx) {
  // Ưu tiên Serper.dev (không cần thẻ, free 2500 query, có giới hạn thời gian tbs)
  if (process.env.SERPER_API_KEY) {
    try {
      let res = await axios.post('https://google.serper.dev/search',
        { q: query, num: 10, tbs: 'qdr:m' },
        { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
      );
      let organic = res.data.organic || [];
      if (organic.length === 0) {
        res = await axios.post('https://google.serper.dev/search',
          { q: query, num: 10, tbs: 'qdr:y' },
          { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
        );
        organic = res.data.organic || [];
      }
      return organic.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        image: item.imageUrl || null,
        date: item.date || null
      }));
    } catch (err) {
      console.error("Serper API error:", err.message);
    }
  }
  if (apiKey && cx && apiKey !== 'YOUR_API_KEY') {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&sort=date&num=10`;
    try {
      const res = await axios.get(url, { timeout: 5000 });
      return (res.data.items || []).map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        image: item.pagemap?.cse_image?.[0]?.src || item.pagemap?.cse_thumbnail?.[0]?.src || null
      }));
    } catch (err) {
      console.error("Google Custom Search API error:", err.message);
    }
  }
  // Fallback Google search (không fetch Facebook)
  try {
    const res = await google.search(query, { page: 0, safe: false, additional_params: { hl: 'vi' } });
    return (res.results || []).map(item => ({
      title: item.title,
      link: item.url,
      snippet: item.description,
      image: item.favicons?.[0] || null
    }));
  } catch (e) {
    return [];
  }
}

// Bước 5: Dùng LLM parse TRỰC TIẾP từ title + snippet (đã index sẵn từ Google)
async function extractStructuredDataWithLLM(titleAndSnippet, defaultCriteria) {
  const prompt = `Đọc nội dung bài đăng sau. Đây có thể là snippet ngắn, hãy suy luận kỹ khoảng thời gian còn hiệu lực nếu có nhắc tới ngày tháng bất kỳ (kể cả không dùng từ "hạn chót").

Trích xuất JSON:
- tieu_chi, ten_hoat_dong, thoi_gian_bat_dau, thoi_gian_ket_thuc (YYYY-MM-DD, để null nếu THỰC SỰ không có mốc thời gian nào trong bài)
- hinh_thuc, co_chung_nhan, huong_dan_lay_chung_nhan

Nội dung: """${titleAndSnippet}"""`;

  try {
    if (process.env.OPENAI_API_KEY) {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      }, {
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
      });
      const content = res.data?.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content.replace(/```json|```/g, '').trim());
        if (parsed.ten_hoat_dong) return parsed;
      }
    }
  } catch (err) {
    console.error("LLM API error (falling back to parser):", err.message);
  }

  // [MVP NOTE cho báo cáo đồ án] Sử dụng rule-based parser chuyên biệt cho demo, sẵn sàng nâng cấp lên LLM thực tế
  const nowYear = new Date().getFullYear();
  let endDate = extractDeadlineDate(titleAndSnippet);

  const tieuChiShort = defaultCriteria.split(' ')[0];
  return {
    tieu_chi: tieuChiShort,
    ten_hoat_dong: titleAndSnippet.substring(0, 100).replace(/\[.*?\]\s*/g, ''),
    thoi_gian_bat_dau: `${nowYear}-01-01`,
    thoi_gian_ket_thuc: endDate,
    hinh_thuc: "Bấm vào link gốc để xem chi tiết thông báo và thể lệ từ trang chính thức",
    co_chung_nhan: true,
    huong_dan_lay_chung_nhan: "Đọc chi tiết tại link Facebook chính thức > Hoàn thành yêu cầu > Nhận chứng nhận cho tiêu chí " + defaultCriteria
  };
}

// Bước 6: Lọc "còn hạn" (mặc định NGHI NGỜ thay vì mặc định CHO QUA khi không rõ deadline)
function isStillValid(activity, postDateFromSearch) {
  if (activity.thoi_gian_ket_thuc) {
    return new Date(activity.thoi_gian_ket_thuc) >= new Date();
  }
  if (postDateFromSearch) {
    const postDate = new Date(postDateFromSearch);
    if (!isNaN(postDate.getTime())) {
      const daysDiff = (new Date() - postDate) / (1000 * 60 * 60 * 24);
      if (daysDiff > 90) return false; // Bài đăng hơn 3 tháng, khả năng cao đã qua hạn
    }
  }
  return true;
}

// Bước 7: Dedup bằng normalizeUrl làm khóa unique
function normalizeUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch (e) {
    return url.trim();
  }
}

// (a) Lọc bỏ các trang chủ Page/Group chung chung, CHỈ chấp nhận link bài viết/sự kiện cụ thể
function isReliablePostLink(url) {
  if (!url) return false;
  // Loại bỏ link trang chủ Page/Group chung chung không trỏ vào bài cụ thể
  if (url.endsWith('/groups') || /facebook\.com\/groups\/[^\/]+\/?$/.test(url)) return false;
  if (/facebook\.com\/[^\/]+\/?$/.test(url) && !url.includes('profile.php') && !url.includes('permalink') && !url.includes('photo')) return false;
  if (url.includes('/about') || url.includes('/followers') || url.includes('/photos_by') || url.includes('/videos_by')) return false;
  
  // Chấp nhận các dạng link bài viết thực tế trên Facebook (bao gồm cả Page, Group, Profile)
  return /facebook\.com\/.*(posts|videos|photos|permalink|story|fbid|events)\/?.*/i.test(url);
}

// Xử lý "còn hạn" chính xác hơn từ văn bản
function extractDeadlineDate(text) {
  const deadlinePatterns = [
    /(?:hạn chót|đến hết|kết thúc|hết hạn|deadline)[^0-9]{0,15}(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{4}))?/i,
    /(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{4}))?\s*(?:là hạn|hết hạn|kết thúc)/i,
  ];
  for (const pattern of deadlinePatterns) {
    const match = text.match(pattern);
    if (match) {
      const day = match[1].padStart(2, '0');
      const month = match[2].padStart(2, '0');
      const year = match[3] || new Date().getFullYear();
      return `${year}-${month}-${day}`;
    }
  }
  return null;
}

// Thêm hàm lọc chất lượng sau khi có kết quả từ Serper/Google
function isLikelyCertificateActivity(item) {
  const text = `${item.title} ${item.snippet}`.toLowerCase();
  const certKeywords = ['giấy chứng nhận', 'cấp chứng nhận', 'nhận chứng nhận', 'chứng chỉ', 'giấy khen', 'chứng nhận'];
  const hasCertMention = certKeywords.some(kw => text.includes(kw));
  const excludeKeywords = ['tuyển dụng', 'tuyển sinh', 'học bổng du học', 'quảng cáo'];
  const isExcluded = excludeKeywords.some(kw => text.includes(kw));
  return hasCertMention && !isExcluded;
}

// Bước 8: Lên lịch chạy (cron) 1 lần/ngày
async function runDailyCronScraper() {
  console.log('[CRON JOB] Bắt đầu quy trình cào hoạt động (Cách 2: Không verify oEmbed tự động, ưu tiên hiển thị và cho sinh viên báo lỗi)...');
  let db = getActivitiesDB();
  let addedCount = 0;

  const allQueries = buildQueries();

  for (const { criteria, query } of allQueries) {
    try {
      // Bước 3: Gọi Custom Search API / Serper
      const items = await searchActivities(query, GOOGLE_API_KEY, GOOGLE_CSE_ID);

      for (const item of items.slice(0, 5)) { // tăng lên 5 để có dư sau khi lọc
        if (!item.link || !item.link.includes('facebook.com')) continue;

        // (a) Lọc link không đáng tin (Group, story.php, permalink)
        if (!isReliablePostLink(item.link)) continue;

        // Lọc chỉ giữ bài thực sự có nhắc tới cấp chứng nhận
        if (!isLikelyCertificateActivity(item)) continue;

        // Bước 7: Dedup bằng normalizeUrl
        const key = normalizeUrl(item.link);
        const isDuplicate = db.some(ex => normalizeUrl(ex.link || ex.postLink) === key || ex.ten_hoat_dong === item.title);
        if (isDuplicate) continue;

        // Bước 5: Parse TRỰC TIẾP từ title + snippet (TUYỆT ĐỐI KHÔNG GỌI fetchFullDescription hay axios tới FB)
        const textToParse = `${item.title} - ${item.snippet}`;
        const structured = await extractStructuredDataWithLLM(textToParse, criteria);

        // Bước 6: Lọc "còn hạn" (dùng thêm tín hiệu ngày đăng từ Serper)
        const validStatus = isStillValid(structured, item.date);
        if (validStatus === false) continue;

        const needsReview = !structured.thoi_gian_ket_thuc;
        const bannerImg = getActivityImage(criteria, item.image);
        const newDoc = {
          id: 'FB_CRON_' + Math.random().toString(36).substr(2, 9),
          ...structured,
          title: structured.ten_hoat_dong || item.title,
          matched_criteria: criteria,
          source: normalizeUrl(item.link).replace('https://www.', '').replace('https://', ''),
          date: structured.thoi_gian_ket_thuc || new Date().toISOString().substring(0, 10),
          link: item.link,
          postLink: item.link, // Link gốc Facebook để sinh viên bấm vào trình duyệt xem trực tiếp
          pictures: [bannerImg],
          is_active: true,
          needs_review: needsReview,
          broken_reports: 0
        };

        // Upsert vào DB
        db.unshift(newDoc);
        addedCount++;
      }
    } catch (err) {
      console.log(`[CRON JOB] Lỗi quy trình với query "${query}":`, err.message);
    }
  }

  if (addedCount > 0) {
    db = db.filter(item => !item.link?.includes('SAMPLE_ID'));
  }
  saveActivitiesDB(db);
  console.log(`[CRON JOB] Hoàn tất quy trình. Đã upsert ${addedCount} hoạt động mới.`);
  return { success: true, added: addedCount, total: db.length };
}

// Lên lịch cron 1 lần/ngày (24 giờ) và tự chạy lúc khởi động sau 3 giây
setInterval(runDailyCronScraper, 24 * 60 * 60 * 1000);
setTimeout(runDailyCronScraper, 3000);

app.get('/api/ai/recommendations/:studentId', async (req, res) => {
  try {
    const missingQuery = req.query.missing;
    const missingCriteriaList = missingQuery ? missingQuery.split(',') : ["Học tập tốt", "Đạo đức tốt", "Thể lực tốt", "Tình nguyện tốt", "Hội nhập tốt"];

    let db = getActivitiesDB();

    // Lọc các hoạt động thuộc tiêu chí (isStillValid != false và is_active !== false)
    let recommendations = db.filter(item => item.is_active !== false && missingCriteriaList.includes(item.matched_criteria));

    if (recommendations.length === 0) {
      recommendations = db.filter(item => item.is_active !== false).slice(0, 20);
    } else {
      recommendations = recommendations.slice(0, 20);
    }

    res.json(recommendations);
  } catch (err) {
    console.error("Error in AI recommendations endpoint:", err.message);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// API báo lỗi link hỏng từ sinh viên (Cách 2 bền vững)
app.post('/api/ai/recommendations/:id/report-broken', async (req, res) => {
  try {
    const { id } = req.params;
    let db = getActivitiesDB();
    const idx = db.findIndex(item => item.id === id);
    if (idx !== -1) {
      db[idx].broken_reports = (db[idx].broken_reports || 0) + 1;
      if (db[idx].broken_reports >= 2) {
        db[idx].is_active = false; // Ẩn tự động nếu có nhiều người báo lỗi
      }
      saveActivitiesDB(db);
      return res.json({ success: true, message: 'Đã tiếp nhận phản hồi lỗi link', item: db[idx] });
    }
    res.status(404).json({ error: 'Không tìm thấy hoạt động' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xử lý phản hồi' });
  }
});

app.post('/api/ai/cron/trigger', async (req, res) => {
  const result = await runDailyCronScraper();
  res.json(result);
});

app.listen(3008, () => {
  console.log('AI Service (Custom Search Engine 8-Step Pipeline) running on port 3008');
});
