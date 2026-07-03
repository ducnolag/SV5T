const axios = require('axios');
const cheerio = require('cheerio');
async function testURL(url) {
    try {
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
        const $ = cheerio.load(res.data);
        const title = $('title').text();
        console.log(title, '-->', url);
    } catch(e) {
        console.log('FAIL', url);
    }
}
async function run() {
    await testURL('https://www.facebook.com/hoisinhvien.com.vn/posts/1265312698963874/');
    await testURL('https://www.facebook.com/groups/1059695361746080/posts/1185947449120870/');
    await testURL('https://www.facebook.com/ictsv.hust/photos/544238617075223/');
    await testURL('https://www.facebook.com/groups/ctustudents.official/permalink/1978490082771020/');
    await testURL('https://www.facebook.com/sinhvien5tottnus/posts/989005380953052/');
}
run();
