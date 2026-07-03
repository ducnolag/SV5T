const axios = require('axios');
const cheerio = require('cheerio');
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
async function test() {
    const start = Date.now();
    const img = await fetchOgImage('https://www.facebook.com/sinhvien5tottnus/posts/989005380953052/');
    console.log('Image:', img);
    console.log('Time:', Date.now() - start, 'ms');
}
test();
