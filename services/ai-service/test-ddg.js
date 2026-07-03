const axios = require('axios');
async function test() {
    const query = '("chứng chỉ" OR "chứng nhận" OR "đăng ký") "sinh viên" "tình nguyện"';
    const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=vi&gl=VN&ceid=VN:vi';
    const res = await axios.get(url);
    console.log(res.data.substring(0, 1000));
}
test();
