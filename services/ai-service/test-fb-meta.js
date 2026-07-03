const axios = require('axios');
const cheerio = require('cheerio');
async function testFB() {
    try {
        const url = 'https://www.facebook.com/sinhvien5tottnus/posts/989005380953052/';
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 3000 });
        const $ = cheerio.load(res.data);
        const ogImage = $('meta[property="og:image"]').attr('content');
        const title = $('title').text();
        const desc = $('meta[property="og:description"]').attr('content');
        console.log('Image:', ogImage);
        console.log('Title:', title);
        console.log('Desc:', desc);
    } catch(e) {
        console.error('Error:', e.message);
    }
}
testFB();
