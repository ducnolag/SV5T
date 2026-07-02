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

const SMARTBOT_TOKEN = process.env.SMARTBOT_TOKEN || 'Bearer ey...'; // From api.md
const SMARTREADER_TOKEN = process.env.SMARTREADER_TOKEN || 'Bearer ey...'; 

// 1. Chatbot RAG (SmartBot)
app.post('/api/ai/chat', async (req, res) => {
  const { message, userId } = req.body;
  
  try {
    // VNPT SmartBot Integration (Mocked actual HTTP call for Hackathon)
    // const response = await axios.post('https://api.vnptai.io/smartbot/v1/message', { text: message }, { headers: { Authorization: SMARTBOT_TOKEN }});
    
    // Simulate RAG response based on rules
    let reply = "Xin lỗi, tôi chưa hiểu rõ ý bạn.";
    if (message.toLowerCase().includes("học tập tốt")) {
      reply = "Theo Quy chế SV5T năm học 2024-2025, tiêu chí Học tập tốt yêu cầu điểm trung bình tích lũy đạt từ 3.2/4.0 trở lên và không nợ môn nào.";
    } else if (message.toLowerCase().includes("thời hạn")) {
      reply = "Hạn nộp hồ sơ cấp Trường năm nay sẽ đóng vào ngày 15/10/2024. Đừng quên nộp hồ sơ nhé!";
    } else {
      reply = `Đây là câu trả lời tự động từ VNPT SmartBot cho câu hỏi: "${message}". Dựa trên Kho tri thức quy chế SV5T, bạn cần hoàn thành đủ 5 tiêu chí.`;
    }

    res.json({
      role: 'assistant',
      content: reply,
      sources: ["Quy_che_SV5T_VNU_2024.pdf"]
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi kết nối VNPT SmartBot' });
  }
});

// 2. OCR SmartReader
app.post('/api/ai/ocr', upload.single('file'), async (req, res) => {
  const fullName = req.body.fullName;
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
    
    let isNameMatch = true;
    if (fullName) {
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

// 3. AI Recommendations
app.get('/api/ai/recommendations/:studentId', async (req, res) => {
  // Analyze missing criteria and fetch vnSocial events
  const keywords = {
    "Đạo đức": ["đạo đức", "khen thưởng", "chấp hành", "tốt"],
    "Học tập": ["học tập", "gpa", "bảng điểm", "xuất sắc", "chứng nhận", "giải thưởng", "ielts", "toeic", "tiếng anh"],
    "Thể lực": ["thể lực", "thể thao", "giải", "huy chương", "thanh niên khỏe", "sinh viên khỏe"],
    "Tình nguyện": ["tình nguyện", "mùa hè xanh", "hiến máu", "chiến dịch", "tích cực"],
    "Hội nhập": ["hội nhập", "kỹ năng", "quốc tế", "giao lưu", "ngoại ngữ", "toạ đàm", "hội thảo"]
  };
  res.json([
    {
      id: "evt_1",
      title: "Chiến dịch Mùa hè xanh 2024",
      matched_criteria: "Tình nguyện tốt",
      source: "vnSocial Fanpage Hội Sinh viên",
      date: "2024-07-15"
    },
    {
      id: "evt_2",
      title: "Hội thảo Nghiên cứu khoa học toàn quốc",
      matched_criteria: "Học tập tốt",
      source: "vnSocial Fanpage ĐHQGHN",
      date: "2024-08-10"
    }
  ]);
});

app.listen(3008, () => {
  console.log('AI Service (VNPT Integration) running on port 3008');
});
