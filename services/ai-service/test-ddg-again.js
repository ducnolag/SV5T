const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent('site:facebook.com "sinh viên" "chứng nhận"');
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 5000 });
        const $ = cheerio.load(res.data);
        const links = [];
        $('.result__url').each((i, el) => {
            links.push($(el).attr('href'));
        });
        console.log('DDG Links found:', links.length);
        console.log(links.slice(0, 5));
    } catch(e) {
        console.error(e.message);
    }
}
test();
