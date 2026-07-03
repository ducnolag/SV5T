const axios = require('axios');
const cheerio = require('cheerio');
async function verifyFB(url) {
    try {
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 3000 });
        const $ = cheerio.load(res.data);
        console.log('SUCCESS:', url, '| Title:', $('title').text());
    } catch(e) {
        console.log('FAIL:', url);
    }
}
async function run() {
    await verifyFB('https://www.facebook.com/hoisinhvien.com.vn');
    await verifyFB('https://www.facebook.com/Trunguongdoan');
    await verifyFB('https://www.facebook.com/tinhnguyenquocgia');
    await verifyFB('https://www.facebook.com/muahexanh.vn');
    await verifyFB('https://www.facebook.com/VUG.vn');
    await verifyFB('https://www.facebook.com/khoahoctre');
    await verifyFB('https://www.facebook.com/YSEALIVietnam');
    await verifyFB('https://www.facebook.com/groups/sv5t.vn');
}
run();
