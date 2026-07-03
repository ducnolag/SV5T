const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const url = 'https://doanthanhnien.vn/tin-tuc/thanh-nien-viet-nam';
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
        const $ = cheerio.load(res.data);
        console.log($('.news-item').length);
    } catch(e) {
        console.error(e.message);
    }
}
test();
