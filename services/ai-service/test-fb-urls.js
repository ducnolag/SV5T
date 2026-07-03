const axios = require('axios');
const cheerio = require('cheerio');
async function testFB(url) {
    try {
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 3000 });
        const $ = cheerio.load(res.data);
        console.log(url, 'SUCCESS:', $('title').text());
    } catch(e) {
        console.log(url, 'FAIL');
    }
}
async function run() {
    await testFB('https://www.facebook.com/tinhnguyenquocgia/posts/pfbid02b9Nn2vGZ6n1P9wU1vB9wBqX'); // Fake
    await testFB('https://www.facebook.com/uprace/posts/1015981234567'); // Fake
}
run();
