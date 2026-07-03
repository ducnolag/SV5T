const axios = require('axios');
async function test() {
    try {
        const url = 'https://www.facebook.com/hoisinhvien.com.vn/posts/1265312698963874/';
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
        console.log('SUCCESS');
    } catch(e) {
        console.log('FAIL', e.message);
    }
}
test();
