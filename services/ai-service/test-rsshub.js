const axios = require('axios');
async function test() {
    try {
        const url = 'https://rsshub.app/facebook/page/TrungUongDoan';
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
        console.log(res.data.substring(0, 500));
    } catch(e) {
        console.error(e.message);
    }
}
test();
