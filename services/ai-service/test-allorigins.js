const axios = require('axios');
async function test() {
    const query = 'site:facebook.com "sinh viên" "chứng nhận"';
    const targetUrl = 'https://lite.duckduckgo.com/lite/';
    const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl);
    // allorigins only supports GET. Lite DuckDuckGo needs POST for search.
    // Let's use html.duckduckgo.com
    const targetUrl2 = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query);
    const url2 = 'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl2);
    try {
        const res = await axios.get(url2);
        const data = JSON.parse(res.data.contents);
        console.log(data.substring(0, 500));
    } catch(e) {
        console.error(e.message);
    }
}
test();
