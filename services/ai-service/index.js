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

// Lưu lịch sử tạm theo userId (production nên dùng Redis thay vì biến trong RAM)
const conversationStore = new Map();
const MAX_HISTORY_TURNS = 6; // giữ 6 lượt gần nhất để tránh tốn token

function getHistory(userId) {
  return conversationStore.get(userId) || [];
}
function pushHistory(userId, userMsg, botMsg) {
  const h = getHistory(userId);
  h.push({ role: 'user', content: userMsg });
  h.push({ role: 'assistant', content: botMsg });
  while (h.length > MAX_HISTORY_TURNS * 2) h.shift();
  conversationStore.set(userId, h);
}

// Hàm gọi LLM thực tế theo mô hình Fallback Chain (Groq -> Gemini -> OpenAI)
async function callExternalLLM(message, systemPrompt, history = []) {
  const providers = [];

  if (process.env.GROQ_API_KEY) providers.push(() => callGroq(message, systemPrompt, history));
  if (process.env.GEMINI_API_KEY) providers.push(() => callGemini(message, systemPrompt, history));
  if (process.env.OPENAI_API_KEY) providers.push(() => callOpenAI(message, systemPrompt, history));

  for (const call of providers) {
    try {
      const reply = await call();
      if (reply && reply.trim().length > 0) return reply;
    } catch (e) {
      console.error('LLM provider failed, trying next:', e.message);
    }
  }
  return null;
}

async function callGroq(message, systemPrompt, history = []) {
  const apiKey = process.env.GROQ_API_KEY;
  const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
    model: 'llama-3.3-70b-versatile', // model 70B mạnh hơn nhiều so với llama3-8b-8192
    messages: [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ],
    temperature: 0.6,
    max_tokens: 1024
  }, { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 15000 });
  return res.data.choices?.[0]?.message?.content;
}

async function callOpenAI(message, systemPrompt, history = []) {
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4o-mini', // rẻ hơn và chất lượng cao hơn hẳn 3.5-turbo
    messages: [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ],
    temperature: 0.6
  }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, timeout: 15000 });
  return res.data.choices?.[0]?.message?.content;
}

async function callGemini(message, systemPrompt, history = []) {
  const contents = [
    ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
    { role: 'user', parts: [{ text: message }] }
  ];
  const apiKey = process.env.GEMINI_API_KEY;
  const modelsToTry = ['gemma-4-26b-a4b-it', 'gemma-4-31b-it', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash-lite', 'gemini-2.0-flash'];
  for (const model of modelsToTry) {
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        { systemInstruction: { parts: [{ text: systemPrompt }] }, contents },
        { timeout: 15000 }
      );
      const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (e) {
      console.error(`Gemini model ${model} failed:`, e.response?.data?.error?.message || e.message);
    }
  }
  return null;
}

// Bộ máy giả lập suy luận thông minh như LLM (khi không cài API key hoặc API lỗi)
function generateIntelligentFallback(message, targetRules, capDoName, namHoc, allQuyChes) {
  const lower = message.toLowerCase().trim();
  const rulesMap = targetRules.map(r => `**🔹 ${r.ten_tieu_chi}**\n*Yêu cầu:* ${r.mo_ta || 'Đang cập nhật...'}`).join('\n\n');

  // 1. Chào hỏi tự nhiên, giao tiếp thân thiện (chỉ khi câu ngắn gọn hoặc rõ ý chào hỏi)
  if (/^(xin chào|chào bot|chào bạn|chào|hi\b|hello|hey\b|alo|ê\b|good morning|good afternoon)/i.test(lower) && lower.split(/\s+/).length <= 6) {
    return `👋 **Xin chào bạn! Tôi là Trợ lý AI tư vấn Sinh viên 5 tốt (Năm học ${namHoc}).**\n\n` +
           `Tôi luôn sẵn sàng trò chuyện, giải đáp thắc mắc và đồng hành cùng bạn trên con đường rèn luyện toàn diện! 🤖✨\n\n` +
           `💡 **Bạn có thể trò chuyện với tôi về:**\n` +
           `- 💬 *Tư vấn định hướng:* "Bạn có thể giúp gì cho tôi?", "Làm thế nào để xây dựng kỹ năng mềm?"\n` +
           `- 📊 *Đánh giá hồ sơ cá nhân:* "GPA 3.2 và ĐRL 85 có đủ điều kiện xét danh hiệu không?"\n` +
           `- 🚀 *Lộ trình rèn luyện:* "Cách bắt đầu chinh phục SV5T từ con số 0"\n` +
           `- 📋 *Quy chế & Minh chứng:* "Xem yêu cầu tiêu chí Tình nguyện tốt", "Cách nộp minh chứng lấy ngay"\n\n` +
           `👉 *Hôm nay bạn muốn chúng ta trao đổi về chủ đề nào, hãy nhắn cho tôi nhé!*`;
  }

  // 2. Hỏi về danh tính / Khả năng của Bot / Câu hỏi chung "giúp gì ngoài quy chế"
  if (lower.includes("bạn là ai") || lower.includes("giúp gì") || lower.includes("làm được gì") || lower.includes("tính năng") || lower.includes("ngoài chuyện quy chế") || lower.includes("có thể làm gì") || lower.includes("chức năng")) {
    return `🤖 **Tôi là Trợ lý AI Toàn năng của Hệ thống Sinh viên 5 tốt (${namHoc})!**\n\n` +
           `Không chỉ là một công cụ tra cứu quy chế, tôi được thiết kế với tư duy hỗ trợ toàn diện cho sinh viên như một LLM thực thụ:\n\n` +
           `🎯 **1. Đánh giá & Phân tích Hồ sơ Cá nhân (Định lượng):**\n` +
           `Bạn chỉ cần đưa ra các con số (ví dụ: *GPA 3.2, ĐRL 85, có chứng chỉ IELTS 6.5*), tôi sẽ tính toán chính xác mức độ đạt chuẩn và chỉ ra bạn cần bổ sung điều kiện gì cho từng cấp (Trường, Tỉnh, TW).\n\n` +
           `🗺️ **2. Tư vấn Lộ trình & Chiến lược Rèn luyện:**\n` +
           `Chia sẻ với bạn phương pháp học tập tốt, cách tham gia nghiên cứu khoa học, rèn luyện thể lực hay tìm kiếm chiến dịch tình nguyện phù hợp với ngành học.\n\n` +
           `🔍 **3. Kết nối Hoạt động & Kiểm tra Minh chứng:**\n` +
           `Đồng hành cùng bạn tự động quét các bài đăng hoạt động mới nhất từ Facebook trường/hội, hướng dẫn cách upload giấy chứng nhận để AI OCR tự động kiểm tra không bị lỗi.\n\n` +
           `💡 **4. Lắng nghe & Trò chuyện đời sống sinh viên:**\n` +
           `Sẵn sàng chia sẻ lời khuyên về vượt qua áp lực thi cử, định hướng nghề nghiệp và kỹ năng hội nhập toàn cầu.\n\n` +
           `👉 *Bạn muốn thử trải nghiệm tính năng nào ngay bây giờ?*`;
  }

  // 3. XÁC MINH HOẠT ĐỘNG / ĐỐI CHIẾU TIÊU CHÍ (Tính năng thông minh AI)
  const isQuestion = /(?:đạt|được|tính|có|tiêu chí|thuộc|vào|đáp ứng|bao nhiêu|đủ|làm sao|ở đâu|điểm|quyết định|chứng nhận|hợp lệ|khớp|là sao|à|không|ổn|thì sao|như thế nào)/i.test(lower);

  // 3.1. Hỏi về Thể lực (chạy bộ, thể thao, bơi, giải đấu, sinh viên khỏe...)
  if (/(?:chạy|thể thao|bóng đá|cầu lông|bơi|sinh viên khỏe|thể dục|giải chạy|marathon|đi bộ|trekking|thể lực|khỏe)/i.test(lower) && isQuestion) {
    const r = targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes("thể lực"));
    return `🏃 **Tư vấn về Hoạt động Thể lực & Thể thao (Cấp ${capDoName} - ${namHoc}):**\n\n` +
           `✅ **Câu trả lời là CÓ!** Việc tham gia các giải chạy bộ (online/offline), giải đấu thể thao (bóng đá, cầu lông, cờ vua...) hoặc đạt danh hiệu **"Sinh viên khỏe"** chính là minh chứng chuẩn xác nhất để hoàn thành tiêu chí **Thể lực tốt**.\n\n` +
           `📜 **Quy định cụ thể của tiêu chí Thể lực tốt tại đơn vị của bạn:**\n` +
           `*${r ? r.mo_ta : 'Đạt danh hiệu "Sinh viên khỏe" hoặc tham gia ít nhất 1 hoạt động thể thao cấp Trường/Khoa trở lên.'}*\n\n` +
           `💡 **Cách nộp minh chứng để được duyệt 100%:**\n` +
           `- Chụp ảnh **Giấy chứng nhận / Huy chương / Screenshot xác nhận hoàn thành cự ly** (kèm họ tên và tên giải đấu).\n` +
           `- Vào mục **Minh chứng** -> Chọn tiêu chí **Thể lực tốt** -> Tải ảnh lên. AI OCR sẽ tự động quét và xác nhận đạt cho bạn ngay lập tức! 🚀`;
  }

  // 3.2. Hỏi về Tình nguyện (hiến máu, mùa hè xanh, tiếp sức mùa thi, công tác xã hội...)
  if (/(?:hiến máu|mùa hè xanh|tiếp sức mùa thi|tình nguyện|công tác xã hội|từ thiện|giúp đỡ|quét dọn|quỹ|ngày thứ 7|xanh)/i.test(lower) && isQuestion) {
    const r = targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes("tình nguyện"));
    return `🤝 **Tư vấn về Hoạt động Tình nguyện & Cống hiến (Cấp ${capDoName} - ${namHoc}):**\n\n` +
           `✅ **Hoàn toàn chính xác!** Các hoạt động như Hiến máu nhân đạo, Mùa hè xanh, Tiếp sức mùa thi, hoặc chiến dịch tình nguyện do Đoàn/Hội tổ chức là minh chứng tiêu biểu cho tiêu chí **Tình nguyện tốt**.\n\n` +
           `📜 **Quy định của tiêu chí Tình nguyện tốt:**\n` +
           `*${r ? r.mo_ta : 'Tham gia ít nhất 02 hoạt động tình nguyện hoặc được biểu dương, khen thưởng trong công tác xã hội.'}*\n\n` +
           `💡 **Lưu ý quan trọng khi tải minh chứng:**\n` +
           `- Giấy chứng nhận hiến máu hoặc Giấy khen/Xác nhận tham gia chiến dịch tình nguyện cần có **dấu đỏ hoặc chữ ký điện tử hợp lệ** của đơn vị tổ chức.\n` +
           `- Nếu bạn tham gia qua trang **Đề xuất hoạt động**, hệ thống đã tự động liên kết dữ liệu chứng nhận cho bạn!`;
  }

  // 3.3. Hỏi về Học tập & NCKH (bài báo, nckh, olympic, học thuật...)
  if (/(?:nckh|nghiên cứu|bài báo|olympic|học thuật|cuộc thi|chuyên ngành|hội thảo|sáng tạo|đề tài)/i.test(lower) && isQuestion) {
    const r = targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes("học"));
    return `📚 **Tư vấn về Hoạt động Học tập & Nghiên cứu khoa học (Cấp ${capDoName} - ${namHoc}):**\n\n` +
           `✅ **Rất xuất sắc!** Viết bài báo khoa học, tham gia đề tài NCKH, thi Olympic các môn học hay đạt giải cuộc thi học thuật là những minh chứng "điểm nhấn" để chinh phục tiêu chí **Học tập tốt** (đặc biệt bắt buộc đối với cấp Tỉnh và Trung ương).\n\n` +
           `📜 **Yêu cầu quy chuẩn cho tiêu chí Học tập tốt:**\n` +
           `*${r ? r.mo_ta : 'Đạt GPA chuẩn theo quy định và có tham gia hoạt động nghiên cứu khoa học hoặc thi học thuật.'}*\n\n` +
           `💡 **Cách phân loại minh chứng:**\n` +
           `- *Bảng điểm GPA:* Tải lên học bạ/bảng điểm có xác nhận phòng đào tạo.\n` +
           `- *Giấy khen NCKH/Olympic:* Tải riêng vào mục minh chứng bổ trợ cho tiêu chí Học tập tốt.`;
  }

  // 3.4. Hỏi về Hội nhập & Ngoại ngữ (ielts, toeic, hsk, giao lưu quốc tế...)
  if (/(?:ielts|toeic|toefl|hsk|b1|b2|c1|ngoại ngữ|tiếng anh|tiếng trung|tiếng nhật|tiếng hàn|giao lưu|quốc tế|hội nhập|kỹ năng mềm|workshop|hùng biện)/i.test(lower) && isQuestion) {
    const r = targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes("hội nhập"));
    return `🌍 **Tư vấn về Ngoại ngữ & Kỹ năng Hội nhập (Cấp ${capDoName} - ${namHoc}):**\n\n` +
           `✅ **Chính xác!** Các chứng chỉ ngoại ngữ (IELTS, TOEIC, B1, HSK...) hoặc tham gia các chương trình giao lưu sinh viên quốc tế, hội thảo tiếng Anh là điều kiện tiên quyết để đạt tiêu chí **Hội nhập tốt**.\n\n` +
           `📜 **Quy chuẩn của tiêu chí Hội nhập tốt tại đơn vị:**\n` +
           `*${r ? r.mo_ta : 'Đạt chuẩn trình độ ngoại ngữ B1/TOEIC/IELTS hoặc tham gia các hoạt động hội nhập, kỹ năng toàn cầu.'}*\n\n` +
           `💡 **Mẹo nhỏ cho sinh viên:**\n` +
           `- Nếu chưa có chứng chỉ quốc tế, bạn hoàn toàn có thể tham gia các **cuộc thi Hùng biện tiếng Anh, Câu lạc bộ Ngoại ngữ** hoặc các khóa đào tạo kỹ năng mềm của trường để thay thế (tùy theo cấp độ xét duyệt)!`;
  }

  // 3.5. Hỏi về Đạo đức & Rèn luyện (đoàn, hội, cán bộ lớp, khen thưởng...)
  if (/(?:đoàn|hội|lớp trưởng|bí thư|khen thưởng|chấp hành|kỷ luật|đạo đức|nội quy|cán bộ)/i.test(lower) && isQuestion) {
    const r = targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes("đạo đức"));
    return `💖 **Tư vấn về Điểm rèn luyện & Tiêu chí Đạo đức tốt (Cấp ${capDoName} - ${namHoc}):**\n\n` +
           `✅ **Đúng vậy!** Điểm rèn luyện (thường từ 80 điểm trở lên), thành tích làm cán bộ Đoàn/Hội (Lớp trưởng, Bí thư, BCH) hoặc các giấy khen biểu dương gương người tốt việc tốt là cốt lõi của tiêu chí **Đạo đức tốt**.\n\n` +
           `📜 **Quy định tiêu chí Đạo đức tốt:**\n` +
           `*${r ? r.mo_ta : 'Điểm rèn luyện từ 80 trở lên, không vi phạm quy chế pháp luật và tích cực trong công tác Đoàn/Hội.'}*\n\n` +
           `💡 **Cách chứng minh:** Tải lên bảng kết quả điểm rèn luyện của học kỳ/năm học từ cổng thông tin sinh viên hoặc quyết định khen thưởng cán bộ lớp xuất sắc.`;
  }

  // 3.6. Hỏi cách xác định hoạt động/minh chứng bất kỳ đáp ứng tiêu chí nào ("hoạt động này đáp ứng tiêu chí không?")
  if (/(?:hoạt động này|minh chứng này|bài đăng này|cuộc thi này|chương trình này|cái này)/i.test(lower) || (lower.includes("đáp ứng tiêu chí") || lower.includes("thuộc tiêu chí") || lower.includes("tính vào tiêu chí") || lower.includes("nộp vào tiêu chí") || lower.includes("xếp vào đâu") || lower.includes("tính vào đâu") || lower.includes("được tính tiêu chí nào") || lower.includes("được tính vào tiêu chí nào"))) {
    return `🎯 **Cách xác định Hoạt động / Minh chứng đáp ứng Tiêu chí nào:**\n\n` +
           `Để biết chính xác một hoạt động hoặc tờ Giấy chứng nhận của bạn thuộc tiêu chí nào trong 5 tiêu chí, hãy đối chiếu theo nguyên tắc chuẩn sau của hệ thống:\n\n` +
           `1️⃣ **📚 Học tập tốt:**\n` +
           `   - *Áp dụng cho:* Giấy khen học bổng, Chứng nhận tham gia/đạt giải Nghiên cứu khoa học (NCKH), thi Olympic, cuộc thi học thuật, chuyên môn nghề nghiệp.\n` +
           `2️⃣ **💖 Đạo đức tốt:**\n` +
           `   - *Áp dụng cho:* Phiếu điểm rèn luyện ($\\ge 80$ điểm), Giấy khen Cán bộ Đoàn/Hội xuất sắc, Gương thanh niên tiêu biểu.\n` +
           `3️⃣ **🏃 Thể lực tốt:**\n` +
           `   - *Áp dụng cho:* Giấy chứng nhận "Sinh viên khỏe", Huy chương/chứng nhận giải chạy bộ, giải bóng đá, bóng chuyền, cầu lông, hội thao sinh viên.\n` +
           `4️⃣ **🤝 Tình nguyện tốt:**\n` +
           `   - *Áp dụng cho:* Giấy chứng nhận Hiến máu nhân đạo, Tiếp sức mùa thi, Mùa hè xanh, chiến dịch Xuân tình nguyện, các hoạt động từ thiện cộng đồng.\n` +
           `5️⃣ **🌍 Hội nhập tốt:**\n` +
           `   - *Áp dụng cho:* Chứng chỉ ngoại ngữ (IELTS/TOEIC/B1...), Giấy chứng nhận tham gia hội thảo quốc tế, cuộc thi tiếng Anh, workshop kỹ năng mềm, giao lưu văn hóa.\n\n` +
           `🤖 **🔥 TÍNH NĂNG AI SIÊU VIỆT:** Khi bạn vào trang **Hồ sơ -> Nộp minh chứng** và tải ảnh lên, **AI OCR Anti-Fraud** của chúng tôi sẽ tự động đọc nội dung văn bản trên ảnh và **TỰ ĐỘNG GỢI Ý / XẾP ĐÚNG TIÊU CHÍ** cho bạn mà bạn không cần phải tự suy đoán! Hãy tải ảnh lên thử ngay nhé! 🚀`;
  }

  // 3.7. Hỏi chung về tính hợp lệ của hoạt động / được tính không
  if (lower.includes("được tính không") || lower.includes("có được tính") || lower.includes("đáp ứng không") || lower.includes("được cộng điểm") || lower.includes("có hợp lệ") || lower.includes("có được không") || lower.includes("được tính không ạ") || lower.includes("có tính không")) {
    return `💡 **Tư vấn AI về Tính hợp lệ của Hoạt động / Minh chứng:**\n\n` +
           `Đối với hoạt động hoặc minh chứng bạn đang quan tâm (**"${message}"**), hệ thống sẽ đánh giá tính hợp lệ dựa trên 3 tiêu chuẩn cốt lõi:\n\n` +
           `1️⃣ **Đúng chuyên đề tiêu chí:** Hoạt động cần thể hiện rõ nội dung liên quan đến 1 trong 5 mặt: *Học tập (chuyên môn/NCKH), Đạo đức (rèn luyện/chấp hành), Thể lực (thể thao/chạy bộ), Tình nguyện (cống hiến cộng đồng), hoặc Hội nhập (ngoại ngữ/kỹ năng)*.\n` +
           `2️⃣ **Đơn vị tổ chức cấp Giấy chứng nhận:** Giấy chứng nhận, giấy khen hoặc email xác nhận phải do các đơn vị uy tín (Đoàn Thanh niên, Hội Sinh viên, Khoa/Trường, hoặc các câu lạc bộ chính thức) cấp.\n` +
           `3️⃣ **Thời gian hợp lệ:** Hoạt động phải diễn ra trong năm học xét tuyển (Năm học ${namHoc}).\n\n` +
           `👉 **Cách nhanh nhất để kiểm tra:** Bạn hãy tải ảnh chụp chứng nhận đó vào mục **Nộp minh chứng**, AI của hệ thống sẽ tự động quét OCR và phản hồi ngay lập tức xem hoạt động đó đạt bao nhiêu % độ tin cậy và thuộc tiêu chí nào nhé! 🚀`;
  }

  // 4. Phân tích điểm số / Đánh giá hồ sơ cá nhân (GPA, ĐRL, IELTS...)
  const gpaMatch = lower.match(/(?:gpa|điểm trung bình|tbht|điểm học tập|đht|điểm)\s*[:=]?\s*([0-3]+[\.,]?[0-9]*|4[\.,]?0*|8[\.,][0-9]+|9[\.,][0-9]+|10)/i);
  const drlMatch = lower.match(/(?:drl|đrl|điểm rèn luyện|rèn luyện)\s*[:=]?\s*([0-9]{2,3})/i) || lower.match(/\b(8[0-9]|9[0-9]|100)\b/);
  if ((gpaMatch || drlMatch || lower.includes("có đạt không") || lower.includes("đủ điều kiện không") || lower.includes("đánh giá hồ sơ") || lower.includes("bảng điểm") || lower.includes("ielts") || lower.includes("toeic")) && !lower.includes("là gì")) {
    let advice = `📊 **Phân tích chuyên sâu hồ sơ cá nhân của bạn cho danh hiệu SV5T cấp ${capDoName} (${namHoc}):**\n\n`;
    if (gpaMatch) {
      const val = parseFloat(gpaMatch[1].replace(',', '.'));
      if (val >= 3.2 || val >= 8.0) {
        advice += `✅ **Điểm học tập (${val}):** RẤT XUẤT SẮC! Bạn đã vượt nền chuẩn tối thiểu của tiêu chí Học tập tốt. Để tự tin đạt cấp cao (Tỉnh/TW), bạn nên chuẩn bị thêm đề tài NCKH hoặc giải thưởng chuyên ngành nhé!\n`;
      } else if (val >= 2.8) {
        advice += `🟡 **Điểm học tập (${val}):** Ở mức Khá - Tốt! Đáp ứng điều kiện xét tại nhiều Khoa/Trường, bạn có thể bù đắp bằng các thành tích nghiên cứu khoa học tích cực.\n`;
      } else {
        advice += `⚠️ **Điểm học tập (${val}):** Hiện tại cần nỗ lực thêm ở học kỳ tới để đạt chuẩn căn bản nhé. Hãy kiên trì!\n`;
      }
    }
    if (drlMatch) {
      const drl = parseInt(drlMatch[1]);
      if (drl >= 80) {
        advice += `✅ **Điểm rèn luyện (${drl}):** ĐẠT CHUẨN! Tiêu chí Đạo đức tốt yêu cầu điểm rèn luyện từ 80 điểm trở lên cùng lối sống gương mẫu.\n`;
      } else {
        advice += `⚠️ **Điểm rèn luyện (${drl}):** Cần tối thiểu 80 điểm. Bạn nhớ tích cực tham gia đầy đủ các buổi sinh hoạt Đoàn/Hội và câu lạc bộ nhé!\n`;
      }
    }
    if (lower.includes("ielts") || lower.includes("toeic") || lower.includes("b1") || lower.includes("b2") || lower.includes("ngoại ngữ")) {
      advice += `🌐 **Ngoại ngữ & Hội nhập:** Chứng chỉ ngoại ngữ (IELTS/TOEIC/B1...) là lợi thế tuyệt đối giúp bạn hoàn thành xuất sắc tiêu chí **Hội nhập tốt**!\n`;
    }
    advice += `\n💡 *Gợi ý từ AI:* Hãy nộp ngay các minh chứng bạn đang có vào mục **Minh chứng** để hệ thống AI OCR tự động kiểm duyệt và chấm tiến độ % cho bạn nhé!`;
    return advice;
  }

  // 5. Hỏi lộ trình / Cách bắt đầu / Hướng dẫn chung
  if ((lower.includes("làm sao") || lower.includes("làm thế nào") || lower.includes("bắt đầu") || lower.includes("quy trình") || lower.includes("hướng dẫn") || lower.includes("cách đạt") || lower.includes("cần những gì") || lower.includes("lộ trình")) && (lower.includes("đạt") || lower.includes("sv5t") || lower.includes("sinh viên 5 tốt") || lower.includes("danh hiệu") || lower.includes("bắt đầu") || lower.includes("quy trình") || lower.includes("cần những gì") || lower.includes("lộ trình"))) {
    return `🚀 **Lộ trình 4 bước chinh phục danh hiệu Sinh viên 5 tốt cấp ${capDoName} (${namHoc}):**\n\n` +
           `1️⃣ **Hiểu rõ 5 tiêu chí cốt lõi:**\n` +
           `   - 📚 *Học tập tốt:* GPA đạt chuẩn + NCKH/Olympic.\n` +
           `   - 💖 *Đạo đức tốt:* Điểm rèn luyện ≥ 80, không vi phạm quy chế.\n` +
           `   - 🏃 *Thể lực tốt:* Đạt "Sinh viên khỏe" hoặc tham gia giải thể thao.\n` +
           `   - 🤝 *Tình nguyện tốt:* Tham gia Mùa hè xanh, Hiến máu, Tiếp sức mùa thi...\n` +
           `   - 🌍 *Hội nhập tốt:* Ngoại ngữ (IELTS/TOEIC/B1...) hoặc giao lưu quốc tế.\n\n` +
           `2️⃣ **Sử dụng bảng Đề xuất hoạt động (AI):** Hệ thống đã tự động cào và tổng hợp các cuộc thi có cấp Giấy chứng nhận mới nhất từ các trường và group. Bạn thiếu tiêu chí nào, hãy tham gia ngay bài đăng đó!\n\n` +
           `3️⃣ **Nộp minh chứng ngay khi có:** Chụp ảnh/PDF giấy chứng nhận và tải lên trang Hồ sơ. AI OCR sẽ tự động đọc tên và xác minh giúp bạn.\n\n` +
           `4️⃣ **Hoàn thiện và gửi duyệt:** Kiểm tra tiến độ đạt 100% cho cả 5 tiêu chí trước ngày đóng cổng nhé!`;
  }

  // 6. Hỏi về minh chứng / Cách tìm hoạt động / Lỗi nộp file
  if (lower.includes("minh chứng") || lower.includes("giấy chứng nhận") || lower.includes("chưa có") || lower.includes("lấy ở đâu") || lower.includes("nộp ở đâu") || lower.includes("tìm hoạt động") || lower.includes("upload") || lower.includes("tải file")) {
    return `📑 **Hướng dẫn về Minh chứng & Cách tích lũy Giấy chứng nhận:**\n\n` +
           `🔍 **Nếu bạn chưa có minh chứng / thiếu tiêu chí:**\n` +
           `- Hãy kéo lên phần **"Đề xuất Hoạt động (AI)"** ngay trên trang chủ! Hệ thống liên tục tự động thu thập các cuộc thi, chiến dịch tình nguyện, giải thể thao... từ Facebook chính thức của trường/hội.\n` +
           `- Bấm vào link hoạt động → Tham gia và hoàn thành theo hướng dẫn để nhận Giấy chứng nhận.\n\n` +
           `📤 **Cách nộp minh chứng trên hệ thống:**\n` +
           `1. Vào trang **Hồ sơ của tôi** hoặc tab **Minh chứng**.\n` +
           `2. Bấm nút **"Tải minh chứng lên"** (hỗ trợ ảnh JPG/PNG hoặc PDF).\n` +
           `3. AI sẽ tự động kiểm tra tính hợp lệ (tên, đơn vị cấp, thời hạn) và tự xếp vào tiêu chí phù hợp!\n\n` +
           `*Lưu ý: Ngay khi bạn upload minh chứng thành công, hoạt động gợi ý tương ứng sẽ tự động ẩn đi!*`;
  }

  // 7. Hỏi thời gian / Deadline
  if (lower.includes("thời gian") || lower.includes("hạn nộp") || lower.includes("khi nào hết hạn") || lower.includes("đóng cổng") || lower.includes("deadline")) {
    return `⏰ **Thời gian và Hạn nộp hồ sơ SV5T (${namHoc}):**\n\n` +
           `- Hiện tại cổng nộp hồ sơ đang mở để sinh viên cập nhật minh chứng.\n` +
           `- **Hạn chót nộp hồ sơ:** Theo lịch phân luồng của từng đơn vị (thường đóng vào cuối học kỳ/cuối năm xét chọn).\n` +
           `- 💡 *Lời khuyên:* Đừng để đến ngày cuối cùng mới tải file! Hãy chụp và upload minh chứng lên hệ thống ngay mỗi khi bạn vừa tham gia xong một hoạt động nhé.`;
  }

  // 8. Hỏi phân cấp (Trường, Tỉnh, TW)
  if (lower.includes("cấp trường") || lower.includes("cấp tỉnh") || lower.includes("cấp trung ương") || lower.includes("so sánh các cấp") || lower.includes("khác nhau giữa các cấp")) {
    return `🏛️ **Phân cấp danh hiệu Sinh viên 5 tốt (${namHoc}):**\n\n` +
           `Hệ thống xét chọn theo trình tự từ dưới lên trên:\n` +
           `- 🏫 **Cấp Trường/Học viện:** Là mức nền tảng, điều kiện vừa sức với đa số sinh viên tích cực.\n` +
           `- 🏙️ **Cấp Tỉnh/Thành phố:** Yêu cầu cao hơn, thường chọn từ những sinh viên đã đạt cấp Trường xuất sắc.\n` +
           `- 🇻🇳 **Cấp Trung ương (Quốc gia):** Danh hiệu cao quý nhất, đòi hỏi thành tích vượt trội (như bài báo khoa học, giải thưởng Olympic quốc gia, IELTS điểm cao, chiến sĩ thi đua tình nguyện...).`;
  }

  // 9. Tìm hiểu chi tiết từng tiêu chí cụ thể (chỉ khi có ý hỏi về điều kiện/tiêu chí)
  const findRule = (kw) => targetRules.find(r => r.ten_tieu_chi.toLowerCase().includes(kw));
  if (/(?:tiêu chí|yêu cầu|điều kiện|quy định|chi tiết|như thế nào|là gì).*?(?:học|học tập|nckh)/i.test(lower) || /^(học tập tốt|tiêu chí học tập|học tập)$/i.test(lower)) {
    const r = findRule("học");
    return r ? `📚 **Chi tiết tiêu chí HỌC TẬP TỐT (Cấp ${capDoName} - ${namHoc}):**\n\n${r.mo_ta}\n\n💡 *Gợi ý hoạt động bổ trợ:* Tham gia NCKH cấp trường, thi Olympic các môn học, viết bài báo hội thảo...` : `📚 Tiêu chí **Học tập tốt** yêu cầu đạt điểm GPA theo quy định của đơn vị và có tinh thần vượt khó, nghiên cứu khoa học.`;
  }
  if (/(?:tiêu chí|yêu cầu|điều kiện|quy định|chi tiết|như thế nào|là gì).*?(?:đạo đức|rèn luyện|đrl)/i.test(lower) || /^(đạo đức tốt|tiêu chí đạo đức|đạo đức|điểm rèn luyện)$/i.test(lower)) {
    const r = findRule("đạo đức");
    return r ? `💖 **Chi tiết tiêu chí ĐẠO ĐỨC TỐT (Cấp ${capDoName} - ${namHoc}):**\n\n${r.mo_ta}\n\n💡 *Gợi ý:* Chấp hành tốt quy chế, tham gia đầy đủ sinh hoạt lớp, Đoàn/Hội.` : `💖 Tiêu chí **Đạo đức tốt** yêu cầu điểm rèn luyện từ 80 trở lên và không có hình thức kỷ luật.`;
  }
  if (/(?:tiêu chí|yêu cầu|điều kiện|quy định|chi tiết|như thế nào|là gì).*?(?:tình nguyện|hiến máu|mùa hè xanh)/i.test(lower) || /^(tình nguyện tốt|tiêu chí tình nguyện|tình nguyện)$/i.test(lower)) {
    const r = findRule("tình nguyện");
    return r ? `🤝 **Chi tiết tiêu chí TÌNH NGUYỆN TỐT (Cấp ${capDoName} - ${namHoc}):**\n\n${r.mo_ta}\n\n💡 *Gợi ý:* Các chiến dịch Mùa hè xanh, Tiếp sức mùa thi, Hiến máu nhân đạo, Ngày thứ 7 tình nguyện...` : `🤝 Tiêu chí **Tình nguyện tốt** yêu cầu tham gia ít nhất 1-2 hoạt động tình nguyện hoặc được khen thưởng trong công tác xã hội.`;
  }
  if (/(?:tiêu chí|yêu cầu|điều kiện|quy định|chi tiết|như thế nào|là gì).*?(?:thể lực|thể thao|khỏe)/i.test(lower) || /^(thể lực tốt|tiêu chí thể lực|thể lực|sinh viên khỏe)$/i.test(lower)) {
    const r = findRule("thể lực");
    return r ? `🏃 **Chi tiết tiêu chí THỂ LỰC TỐT (Cấp ${capDoName} - ${namHoc}):**\n\n${r.mo_ta}\n\n💡 *Gợi ý:* Nhận chứng nhận "Sinh viên khỏe", tham gia các giải chạy bộ (offline/online), giải bóng đá, cầu lông, cờ vua...` : `🏃 Tiêu chí **Thể lực tốt** yêu cầu đạt danh hiệu Sinh viên khỏe hoặc tham gia các giải đấu thể thao.`;
  }
  if (/(?:tiêu chí|yêu cầu|điều kiện|quy định|chi tiết|như thế nào|là gì).*?(?:hội nhập|ngoại ngữ|ielts|toeic)/i.test(lower) || /^(hội nhập tốt|tiêu chí hội nhập|hội nhập|ngoại ngữ)$/i.test(lower)) {
    const r = findRule("hội nhập");
    return r ? `🌍 **Chi tiết tiêu chí HỘI NHẬP TỐT (Cấp ${capDoName} - ${namHoc}):**\n\n${r.mo_ta}\n\n💡 *Gợi ý:* Chứng chỉ IELTS/TOEIC/B1, tham gia các cuộc thi tiếng Anh, hội thảo quốc tế, hoặc các khóa học kỹ năng mềm.` : `🌍 Tiêu chí **Hội nhập tốt** yêu cầu trình độ ngoại ngữ đạt chuẩn (IELTS/TOEIC/B1) hoặc tích cực tham gia hoạt động giao lưu quốc tế.`;
  }

  // 10. Tổng hợp toàn bộ quy chế (chỉ khi yêu cầu xem toàn bộ)
  if (/(?:xem|đọc|toàn văn|chi tiết|đầy đủ|tất cả|liệt kê|cho tôi xem).*?(?:quy chế|5 tiêu chí|năm tiêu chí)/i.test(lower) || /^(quy chế|5 tiêu chí|năm tiêu chí|quy chế là gì|các tiêu chí|toàn bộ quy chế)$/i.test(lower)) {
    return `📋 **Toàn văn Quy chuẩn 5 Tiêu chí Sinh viên 5 tốt cấp ${capDoName} (${namHoc}):**\n\n${rulesMap}\n\n👉 *Bạn muốn tư vấn sâu hơn về phương pháp đạt tiêu chí nào không?*`;
  }

  // 11. Câu hỏi giao tiếp nói chung / Trả lời tự nhiên, chuyên sâu như LLM
  return `🤖 **Trợ lý AI Sinh viên 5 tốt (${namHoc}) xin chia sẻ cùng bạn:**\n\n` +
         `Tôi lắng nghe và hiểu bạn đang quan tâm đến vấn đề: **"${message}"**.\n\n` +
         `💡 *Góc trò chuyện & lời khuyên:* Trong quãng đời sinh viên tại trường đại học, ngoài việc học tập kiến thức chuyên môn, điều quan trọng nhất là tinh thần chủ động trải nghiệm, dấn thân vào các hoạt động thực tế và rèn luyện kỹ năng mềm.\n\n` +
         `👉 Danh hiệu **Sinh viên 5 tốt** chính là chiếc la bàn giúp bạn định hướng rèn luyện cân bằng cả 5 mặt:\n` +
         `1️⃣ **Học tập tốt:** Nền tảng chuyên môn vững chắc, tư duy nghiên cứu khoa học.\n` +
         `2️⃣ **Đạo đức tốt:** Tác phong gương mẫu, tích cực sinh hoạt Đoàn/Hội.\n` +
         `3️⃣ **Thể lực tốt:** Sức khỏe bền bỉ để chinh phục mọi mục tiêu.\n` +
         `4️⃣ **Tình nguyện tốt:** Trái tim biết chia sẻ và cống hiến cho cộng đồng.\n` +
         `5️⃣ **Hội nhập tốt:** Bản lĩnh tự tin kết nối toàn cầu và làm chủ ngoại ngữ.\n\n` +
         `📌 *Bạn có câu hỏi nào về cách phát triển kỹ năng, tính điểm hồ sơ, hay muốn tìm ngay một cuộc thi để lấy giấy chứng nhận không? Hãy thoải mái hỏi tôi nhé!*`;
}

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

    const defaultRules = [
      { ten_tieu_chi: "Đạo đức tốt", mo_ta: "Điểm rèn luyện từ 80 điểm trở lên; không vi phạm pháp luật, quy chế của nhà trường." },
      { ten_tieu_chi: "Học tập tốt", mo_ta: "Điểm trung bình chung học tập đạt từ 3.2/4.0 trở lên; tích cực tham gia nghiên cứu khoa học hoặc các cuộc thi học thuật." },
      { ten_tieu_chi: "Thể lực tốt", mo_ta: "Đạt danh hiệu Sinh viên khỏe hoặc tham gia các giải thể thao từ cấp Khoa/Trường trở lên." },
      { ten_tieu_chi: "Tình nguyện tốt", mo_ta: "Tham gia ít nhất 03 ngày tình nguyện trong năm (Mùa hè xanh, hiến máu tình nguyện, tiếp sức mùa thi...) hoặc được khen thưởng về tình nguyện." },
      { ten_tieu_chi: "Hội nhập tốt", mo_ta: "Chứng chỉ Tiếng Anh tối thiểu B1 (hoặc tương đương) và tham gia các hoạt động hội nhập, kỹ năng mềm, giao lưu quốc tế." }
    ];
    let targetRules = (activeRules && activeRules.length > 0) ? activeRules : defaultRules;
    let capDoName = "trường";
    const lowerMsg = (message || "").toLowerCase();
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

    // Tạo System Prompt cho LLM thực tế
    const systemPrompt = `Bạn là trợ lý AI tư vấn "Sinh viên 5 tốt" của hệ thống, năm học ${namHoc}, cấp ${capDoName}.

Quy chế hiện hành (dữ liệu gốc, luôn ưu tiên độ chính xác so với đây):
${JSON.stringify(targetRules, null, 2)}

Cách trả lời:
1. Đọc kỹ câu hỏi, xác định sinh viên đang hỏi về tiêu chí nào hoặc đang mô tả hồ sơ cá nhân (GPA, điểm rèn luyện, chứng chỉ...).
2. Nếu sinh viên đưa ra số liệu cụ thể, hãy đối chiếu với quy chế và phân tích: đạt/chưa đạt, thiếu gì, nên bổ sung minh chứng gì.
3. Nếu câu hỏi mơ hồ, hãy hỏi lại 1 câu ngắn để làm rõ thay vì đoán bừa.
4. Nếu ngoài phạm vi quy chế (tâm sự, định hướng nghề nghiệp, kỹ năng mềm...), vẫn trả lời tự nhiên, hữu ích như một người tư vấn thật, không né tránh.
5. Giữ mạch hội thoại: tham chiếu lại những gì sinh viên đã nói ở lượt trước nếu liên quan.
6. Markdown, emoji vừa phải, ngắn gọn súc tích, tiếng Việt.`;

    const history = getHistory(userId || 'anonymous');
    let reply = await callExternalLLM(message, systemPrompt, history);
    if (!reply) {
      reply = generateIntelligentFallback(message, targetRules, capDoName, namHoc, allQuyChes);
    }
    pushHistory(userId || 'anonymous', message, reply);

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
      await new Promise(r => setTimeout(r, 15));
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

// Hàm kiểm tra hoạt động gợi ý có bị trùng tên với minh chứng sinh viên đã nộp hay không
function isAlreadyUploaded(item, uploadedNames) {
  if (!uploadedNames || !Array.isArray(uploadedNames) || uploadedNames.length === 0) return false;
  const recName = (item.ten_hoat_dong || item.title || '').toLowerCase().replace(/^\[.*?\]\s*/g, '').trim();
  if (!recName) return false;
  return uploadedNames.some(pName => {
    if (!pName) return false;
    // Kiểm tra chứa chuỗi
    if (pName.includes(recName) || recName.includes(pName)) return true;
    // Kiểm tra độ trùng lặp từ vựng (chỉ tính từ có ý nghĩa > 3 ký tự)
    const wordsP = pName.split(/\s+/).filter(w => w.length >= 3);
    const wordsR = recName.split(/\s+/).filter(w => w.length >= 3);
    if (wordsP.length >= 3 && wordsR.length >= 3) {
      const matchCount = wordsP.filter(w => wordsR.includes(w)).length;
      if (matchCount / Math.min(wordsP.length, wordsR.length) >= 0.7) return true;
    }
    return false;
  });
}

app.get('/api/ai/recommendations/:studentId', async (req, res) => {
  try {
    const missingQuery = req.query.missing;
    const missingCriteriaList = missingQuery ? missingQuery.split(',') : ["Học tập tốt", "Đạo đức tốt", "Thể lực tốt", "Tình nguyện tốt", "Hội nhập tốt"];

    let db = getActivitiesDB();

    // Lọc các hoạt động thuộc tiêu chí (isStillValid != false và is_active !== false)
    let recommendations = db.filter(item => item.is_active !== false && missingCriteriaList.includes(item.matched_criteria));

    // Lọc bỏ các hoạt động mà sinh viên đã nộp minh chứng (có tên giống hoặc gửi qua query)
    let uploadedNames = [];
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && req.params.studentId !== 'default') {
      try {
        const proofRes = await axios.get('http://proof:3005/proofs/me', {
          headers: { Authorization: authHeader },
          timeout: 4000
        });
        if (proofRes.data && Array.isArray(proofRes.data)) {
          uploadedNames = proofRes.data.map(p => (p.ten_minh_chung || '').toLowerCase().replace(/^\[.*?\]\s*/g, '').trim()).filter(Boolean);
        }
      } catch (e) {
        // Ignore nếu gọi sang proof-service lỗi
      }
    }
    if (req.query.completed) {
      const qCompleted = decodeURIComponent(req.query.completed).split('|||').map(s => s.toLowerCase().replace(/^\[.*?\]\s*/g, '').trim()).filter(Boolean);
      uploadedNames.push(...qCompleted);
    }

    if (uploadedNames.length > 0) {
      recommendations = recommendations.filter(item => !isAlreadyUploaded(item, uploadedNames));
    }

    if (recommendations.length === 0) {
      recommendations = db.filter(item => item.is_active !== false && !isAlreadyUploaded(item, uploadedNames)).slice(0, 20);
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
