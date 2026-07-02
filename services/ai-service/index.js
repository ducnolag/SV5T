const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

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
app.post('/api/ai/ocr', async (req, res) => {
  const { imageUrl } = req.body;
  
  try {
    // VNPT SmartReader Integration
    // await axios.post('https://api.vnptai.io/smartreader/v1/extract', ...)
    
    res.json({
      extractedData: {
        ho_ten: "Nguyễn Văn A",
        loai_chung_chi: "Giấy khen Tình nguyện xuất sắc",
        ngay_cap: "2024-03-26"
      },
      confidenceScore: 0.98,
      suggestedCriteria: "Tình nguyện tốt"
    });
  } catch (e) {
    res.status(500).json({ error: 'Lỗi kết nối VNPT SmartReader' });
  }
});

// 3. AI Recommendations
app.get('/api/ai/recommendations/:studentId', async (req, res) => {
  // Analyze missing criteria and fetch vnSocial events
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
