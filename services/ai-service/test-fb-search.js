const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const url = 'https://www.facebook.com/search/posts?q=' + encodeURIComponent('sinh viên 5 tốt');
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 3000 });
        const $ = cheerio.load(res.data);
        console.log('Image:', $('meta[property="og:image"]').attr('content'));
        console.log('Title:', $('title').text());
    } catch(e) {
        console.error(e.message);
    }
}
test();
