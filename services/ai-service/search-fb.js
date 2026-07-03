
const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const res = await axios.get('https://html.duckduckgo.com/html/?q=site:facebook.com+%22sinh+vi%C3%AAn+5+t%E1%BB%91t%22+%22nh%E1%BA%ADn+gi%E1%BA%A5y+ch%E1%BB%A9ng+nh%E1%BA%ADn%22', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const $ = cheerio.load(res.data);
        const results = [];
        $('.result').each((i, el) => {
            const title = $(el).find('.result__title').text().trim();
            const snippet = $(el).find('.result__snippet').text().trim();
            const link = $(el).find('.result__url').attr('href');
            results.push({ title, snippet, link });
        });
        console.log(results.slice(0, 3));
    } catch(e) { console.error(e.message); }
}
test();
