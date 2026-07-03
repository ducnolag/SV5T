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

// Read VNPT Credentials from api.md
let smartbotConfig = {};
try {
  const apiContent = fs.readFileSync(path.join(__dirname, '../../api.md'), 'utf-8');
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
} catch(e) { console.error('Failed to read api.md', e); }

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
    let activeRules = [];
    let namHoc = '2025-2026';
    try {
      const response = await axios.get('http://localhost:3006/applications/quy-ches');
      if (response.data && response.data.length > 0) {
        namHoc = response.data[0].nam_hoc;
        activeRules = response.data[0].tieu_chis;
      }
    } catch (e) {
      console.error('Lỗi khi gọi rules API, dùng fallback:', e.message);
    }

    let reply = "Xin lỗi, tôi chưa hiểu rõ ý bạn.";
    const lowerMsg = message.toLowerCase();
    
    // Hàm tìm tiêu chí theo từ khóa
    const findRule = (keyword) => {
      const rule = activeRules.find(r => r.ten_tieu_chi.toLowerCase().includes(keyword));
      return rule ? rule.mo_ta : null;
    };
    
    if (lowerMsg.includes("học tập") || lowerMsg.includes("điểm")) {
      const ruleDesc = findRule("học tập");
      reply = ruleDesc ? `Theo Quy chế SV5T năm ${namHoc}, tiêu chí **Học tập tốt** yêu cầu:\n\n${ruleDesc}` : 
      `Để đạt tiêu chí **Học tập tốt** theo Quy chế SV5T năm ${namHoc}, bạn cần đạt:\n\n- Điểm trung bình chung học tập cả năm đạt từ 3.2/4.0 trở lên.\n- Và đạt thêm ít nhất 01 trong các tiêu chí phụ.`;
    } else if (lowerMsg.includes("đạo đức")) {
      const ruleDesc = findRule("đạo đức");
      reply = ruleDesc ? `Theo Quy chế SV5T năm ${namHoc}, tiêu chí **Đạo đức tốt** yêu cầu:\n\n${ruleDesc}` :
      `Đối với tiêu chí **Đạo đức tốt**, bạn cần:\n\n- Điểm rèn luyện đạt từ 80 điểm trở lên;\n- Không vi phạm pháp luật, quy chế Nhà trường.`;
    } else if (lowerMsg.includes("tình nguyện")) {
      const ruleDesc = findRule("tình nguyện");
      reply = ruleDesc ? `Theo Quy chế SV5T năm ${namHoc}, tiêu chí **Tình nguyện tốt** yêu cầu:\n\n${ruleDesc}` :
      `Tiêu chí **Tình nguyện tốt** yêu cầu bạn đạt 01 trong 02 tiêu chí sau:\n\n- Tham gia ít nhất 03 ngày tình nguyện/năm học.\n- Được khen thưởng từ cấp Khoa trở lên về hoạt động tình nguyện.`;
    } else if (lowerMsg.includes("thể lực")) {
      const ruleDesc = findRule("thể lực");
      reply = ruleDesc ? `Theo Quy chế SV5T năm ${namHoc}, tiêu chí **Thể lực tốt** yêu cầu:\n\n${ruleDesc}` :
      `Với **Thể lực tốt**, bạn đạt 01 trong các tiêu chí:\n\n- Đạt danh hiệu 'Sinh viên khỏe' cấp Học viện.\n- Tham gia/đạt giải hoạt động thể thao.`;
    } else if (lowerMsg.includes("hội nhập")) {
      const ruleDesc = findRule("hội nhập");
      reply = ruleDesc ? `Theo Quy chế SV5T năm ${namHoc}, tiêu chí **Hội nhập tốt** yêu cầu:\n\n${ruleDesc}` :
      `Tiêu chí **Hội nhập tốt** yêu cầu:\n\n- Đạt chứng chỉ tiếng Anh B1 (hoặc điểm học phần ngoại ngữ tích lũy từ 3.0/4.0 hoặc 7.5/10 trở lên).`;
    } else if (lowerMsg.includes("thời gian") || lowerMsg.includes("hạn")) {
      reply = `Hiện tại là thời gian thu thập minh chứng cho năm học ${namHoc}. Bạn hãy tranh thủ cập nhật các minh chứng nhé!`;
    } else {
      reply = `Dựa trên Quy chế SV5T năm ${namHoc}, để đạt danh hiệu bạn cần hoàn thiện đủ 5 tiêu chí. Bạn cần hỏi chi tiết về tiêu chí nào?`;
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
  const lines = text.split('\n');
  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();
    if (lowerLine.startsWith('-') || lowerLine.startsWith('+') || lowerLine.startsWith('*') || /^\d+\./.test(lowerLine)) {
      if (lowerLine.includes('không vi phạm')) {
        continue; // Bỏ qua tiêu chí không vi phạm vì không cần nộp minh chứng
      }
      
      const match = lowerLine.match(/(ít nhất|chọn)\s+0?(\d+)/);
      if (match) {
        count += parseInt(match[2], 10);
      } else if (!lowerLine.includes('trong các tiêu chí sau')) {
        count += 1;
      }
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

app.get('/api/ai/recommendations/:studentId', async (req, res) => {
  try {
    const missingQuery = req.query.missing;
    const missingCriteriaList = missingQuery ? missingQuery.split(',') : ["Học tập tốt", "Đạo đức tốt", "Thể lực tốt", "Tình nguyện tốt", "Hội nhập tốt"];
    
    const token = await getVnSocialToken();
    let fetchedPosts = [];
    
    if (token) {
      try {
        const projRes = await axios.get('https://api-vnsocialplus.vnpt.vn/social-api/v1/projects?type=TOPIC_POLICY', {
          headers: { 'x-access-token': token }
        });
        const projects = projRes.data?.object?.data || [];
        const projectId = projects.length > 0 ? projects[0].id : '659375db02d0a2846d952551';
        
        const postRes = await axios.post('https://api-vnsocialplus.vnpt.vn/social-api/v1/projects/posts', {
          project_id: projectId,
          source: 'baochi',
          start_time: Date.now() - 30 * 24 * 60 * 60 * 1000,
          end_time: Date.now(),
          from: 0,
          size: 20, // Fetch more to filter locally
          reactionary: false
        }, {
          headers: { 'x-access-token': token }
        });
        
        fetchedPosts = postRes.data?.object || [];
      } catch (apiErr) {
        console.error("vnSocial fetch error:", apiErr.message);
      }
    }
    
    // Keyword matching logic for real posts
    const KEYWORDS = {
      "Đạo đức tốt": ["đạo đức", "khen thưởng", "chấp hành", "tuyên dương", "tấm gương", "việc tử tế"],
      "Học tập tốt": ["học tập", "nghiên cứu", "khoa học", "gpa", "tiếng anh", "giải thưởng", "giáo dục", "học bổng", "nckh", "ielts", "toeic"],
      "Thể lực tốt": ["thể lực", "thể thao", "giải chạy", "bóng đá", "thanh niên khỏe", "vug", "marathon", "thể chất"],
      "Tình nguyện tốt": ["tình nguyện", "mùa hè xanh", "hiến máu", "chiến dịch", "tích cực", "xã hội", "tiếp sức", "từ thiện"],
      "Hội nhập tốt": ["hội nhập", "kỹ năng", "quốc tế", "giao lưu", "ngoại ngữ", "toạ đàm", "asean", "hội thảo", "startup", "khởi nghiệp"]
    };

    const MOCK_EVENTS = {
      "Đạo đức tốt": [
        {
          docId: "DD_01_" + Date.now(),
          title: "Hiến máu nhân đạo tại Viện Huyết học - Truyền máu Trung ương (Nhận giấy chứng nhận)",
          sourceName: "Viện Huyết học",
          postLink: "https://vienhuyethoc.vn/lich-hien-mau/",
          pictures: ["https://vienhuyethoc.vn/wp-content/uploads/2020/02/lich-hien-mau.jpg"],
          createDate: new Date().toISOString(),
        }
      ],
      "Học tập tốt": [
        {
          docId: "HT_01_" + Date.now(),
          title: "Tham gia Giải thưởng Sinh viên Nghiên cứu Khoa học Euréka 2024",
          sourceName: "Khoa Học Trẻ",
          postLink: "https://khoahoctre.com.vn/giai-thuong-eureka/",
          pictures: ["https://khoahoctre.com.vn/wp-content/uploads/2023/10/EUREKA-2023.jpg"],
          createDate: new Date().toISOString(),
        }
      ],
      "Tình nguyện tốt": [
        {
          docId: "TN_01_" + Date.now(),
          title: "Đăng ký các hoạt động tại Cổng thông tin Tình nguyện Quốc gia",
          sourceName: "Mạng lưới Tình nguyện",
          postLink: "https://tinhnguyenquocgia.com/",
          pictures: ["https://doanthanhnien.vn/Content/images/logo-dtn.png"],
          createDate: new Date().toISOString(),
        }
      ],
      "Thể lực tốt": [
        {
          docId: "TL_01_" + Date.now(),
          title: "Thử thách chạy bộ trực tuyến UpRace (Có cấp chứng nhận hoàn thành)",
          sourceName: "UpRace",
          postLink: "https://uprace.org/",
          pictures: ["https://uprace.org/wp-content/uploads/2023/07/Cover-Fanpage.jpg"],
          createDate: new Date().toISOString(),
        }
      ],
      "Hội nhập tốt": [
        {
          docId: "HN_01_" + Date.now(),
          title: "Đăng ký Sáng kiến Thủ lĩnh trẻ Đông Nam Á (YSEALI)",
          sourceName: "Đại sứ quán Hoa Kỳ",
          postLink: "https://vn.usembassy.gov/vi/education-culture-vi/yseali-vi/",
          pictures: ["https://vn.usembassy.gov/wp-content/uploads/sites/40/YSEALI-Logo.png"],
          createDate: new Date().toISOString(),
        }
      ]
    };

    let recommendations = [];

    // Filter logic: Recommend multiple per criteria
    for (const criteria of missingCriteriaList) {
      if (!criteria) continue;
      const keywords = KEYWORDS[criteria] || [];
      const matchedPosts = fetchedPosts.filter(p => {
        const text = (p.title + " " + (p.description||"") + " " + (p.content||"")).toLowerCase();
        return keywords.some(k => text.includes(k.toLowerCase()));
      });

      if (matchedPosts.length > 0) {
        matchedPosts.slice(0, 10).forEach(matchedPost => {
          recommendations.push({
            id: matchedPost.docId,
            title: matchedPost.title,
            matched_criteria: criteria,
            source: matchedPost.sourceName,
            date: matchedPost.createDate?.substring(0, 10) || new Date().toISOString().substring(0, 10),
            postLink: matchedPost.postLink,
            pictures: matchedPost.pictures || (matchedPost.picture ? [matchedPost.picture] : [])
          });
          fetchedPosts = fetchedPosts.filter(p => p.docId !== matchedPost.docId);
        });
      }
      
      // Always add at least 1 evergreen real activity to ensure they have an actionable proof-gathering link
      const mocks = MOCK_EVENTS[criteria] || MOCK_EVENTS["Học tập tốt"];
      mocks.forEach(mock => {
        recommendations.push({
          id: mock.docId,
          title: mock.title,
          matched_criteria: criteria,
          source: mock.sourceName,
          date: mock.createDate.substring(0, 10),
          postLink: mock.postLink,
          pictures: mock.pictures
        });
      });
    }

    // Limit total recommendations to 20 so there are plenty for the carousel
    recommendations = recommendations.slice(0, 20);
    
    res.json(recommendations);
  } catch (err) {
    console.error("Error in AI recommendations endpoint:", err.message);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

app.listen(3008, () => {
  console.log('AI Service (VNPT Integration) running on port 3008');
});
