const axios = require('axios');
const cheerio = require('cheerio');
async function testYahoo() {
    const query = 'site:facebook.com "chứng nhận" "sinh viên" "tình nguyện"';
    const url = 'https://search.yahoo.com/search?p=' + encodeURIComponent(query);
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }});
    const $ = cheerio.load(res.data);
    const results = [];
    $('.algo').each((i, el) => {
        const title = $(el).find('h3.title a').text();
        const link = $(el).find('h3.title a').attr('href');
        if(title) results.push({title, link});
    });
    console.log('Yahoo Results:', results.length);
    if(results.length > 0) console.log(results[0]);
}
testYahoo();
