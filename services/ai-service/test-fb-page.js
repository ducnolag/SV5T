const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const url = 'https://www.facebook.com/tinhnguyenquocgia/';
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }});
        const $ = cheerio.load(res.data);
        const links = [];
        $('a[href*="/posts/"]').each((i, el) => {
            links.push($(el).attr('href'));
        });
        console.log('Links found:', links.length);
        console.log(links.slice(0, 3));
    } catch(e) {
        console.error(e.message);
    }
}
test();
