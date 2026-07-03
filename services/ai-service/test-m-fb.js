const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const url = 'https://m.facebook.com/hoisinhvien.com.vn';
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1' }});
        const $ = cheerio.load(res.data);
        const links = [];
        $('a[href*="story.php"]').each((i, el) => {
            links.push($(el).attr('href'));
        });
        $('a').each((i, el) => {
            const h = $(el).attr('href');
            if(h && h.includes('/photos/')) links.push(h);
        });
        console.log('Links found:', links.length);
        console.log(links.slice(0, 5));
    } catch(e) {
        console.error(e.message);
    }
}
test();
