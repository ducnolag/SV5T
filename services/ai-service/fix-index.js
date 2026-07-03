const fs = require('fs');
let code = fs.readFileSync('index.js', 'utf8');
const lines = code.split('\n');
const startLines = lines.slice(0, 385).join('\n'); // 1 to 385

const restOfCode = `
const cheerio = require('cheerio');
const xml2js = require('xml2js');

async function fetchOgImage(url) {
    try {
        const res = await axios.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            timeout: 3000
        });
        const $ = cheerio.load(res.data);
        return $('meta[property="og:image"]').attr('content') || null;
    } catch(e) {
        return null;
    }
}

async function searchActionableEvents(keyword, criteria) {
  // Query Google News for real events to bypass Facebook blocks
  const query = '("chứng chỉ" OR "chứng nhận" OR "đăng ký" OR "tham gia") "sinh viên" "' + keyword + '"';
  const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=vi&gl=VN&ceid=VN:vi';
  
  let validItems = [];
  const genericThumbnails = [
    "https://doanthanhnien.vn/Content/images/logo-dtn.png",
    "https://khoahoctre.com.vn/wp-content/uploads/2023/10/EUREKA-2023.jpg",
    "https://uprace.org/wp-content/uploads/2023/07/Cover-Fanpage.jpg"
  ];
  
  try {
      const res = await axios.get(url);
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(res.data);
      let items = result.rss?.channel?.item || [];
      if (!Array.isArray(items)) items = [items];
      
      for (const item of items) {
          if (!item.title) continue;
          const textToAnalyze = (item.title + ' ' + (item.description || '')).toLowerCase();
          
          const hasActionWords = /phát động|tuyển|mở đơn|đăng ký|tham gia|nhận chứng chỉ|cấp giấy|nhận giấy/.test(textToAnalyze);
          
          // No date filter! It works even in 2026.
          if (hasActionWords || extractFutureDates(textToAnalyze)) {
              validItems.push({
                  docId: 'NEWS_' + Math.random().toString(36).substr(2, 9),
                  title: item.title.split(' - ')[0],
                  sourceName: "Tin tức SV5T - " + (item.source?._ || 'Báo điện tử'),
                  postLink: item.link,
                  createDate: new Date(item.pubDate || Date.now()).toISOString()
              });
          }
      }
      
      validItems = validItems.slice(0, 4);
      
      await Promise.all(validItems.map(async (item) => {
          const articleImage = await fetchOgImage(item.postLink);
          item.pictures = [articleImage || genericThumbnails[Math.floor(Math.random() * genericThumbnails.length)]];
      }));
      
      return validItems;
  } catch (e) {
      console.error("News Search Error:", e.message);
      return [];
  }
}

app.get('/api/ai/recommendations/:studentId', async (req, res) => {
  try {
    const missingQuery = req.query.missing;
    const missingCriteriaList = missingQuery ? missingQuery.split(',') : ["Học tập tốt", "Đạo đức tốt", "Thể lực tốt", "Tình nguyện tốt", "Hội nhập tốt"];
    
    let recommendations = [];

    for (const criteria of missingCriteriaList) {
      if (!criteria) continue;
      
      const searchKeyword = criteria === "Tình nguyện tốt" ? "tình nguyện" : 
                            criteria === "Học tập tốt" ? "học tập" :
                            criteria === "Thể lực tốt" ? "thể thao" :
                            criteria === "Hội nhập tốt" ? "hội nhập" : "đạo đức";
                            
      const liveItems = await searchActionableEvents(searchKeyword, criteria);
      
      liveItems.slice(0, 5).forEach(item => {
        recommendations.push({
          id: item.docId,
          title: item.title,
          matched_criteria: criteria,
          source: item.sourceName,
          date: item.createDate.substring(0, 10),
          postLink: item.postLink,
          pictures: item.pictures
        });
      });
    }

    recommendations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
`;

fs.writeFileSync('index.js', startLines + '\n' + restOfCode);
console.log('Fixed index.js');
