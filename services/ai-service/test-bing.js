const axios = require('axios');
const cheerio = require('cheerio');
async function testBing() {
    const query = 'site:facebook.com "chứng nhận" "sinh viên" "tình nguyện"';
    const url = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' }});
    const $ = cheerio.load(res.data);
    const results = [];
    $('.b_algo').each((i, el) => {
        const title = $(el).find('h2 a').text();
        const link = $(el).find('h2 a').attr('href');
        if(title) results.push({title, link});
    });
    console.log('Bing Results:', results.length);
    if(results.length > 0) console.log(results[0]);
}
testBing();
