const axios = require('axios');
const cheerio = require('cheerio');
const xml2js = require('xml2js');

async function test() {
    const query = '("chứng chỉ" OR "chứng nhận" OR "đăng ký") "sinh viên" "tình nguyện"';
    const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=vi&gl=VN&ceid=VN:vi';
    const res = await axios.get(url);
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(res.data);
    let items = result.rss?.channel?.item || [];
    if (!Array.isArray(items)) items = [items];
    
    if (items.length > 0) {
        const link = items[0].link;
        console.log('Fetching image for:', link);
        try {
            const articleRes = await axios.get(link, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
            const $ = cheerio.load(articleRes.data);
            const ogImage = $('meta[property="og:image"]').attr('content');
            console.log('Image:', ogImage);
        } catch (e) {
            console.error('Error fetching image:', e.message);
        }
    }
}
test();
