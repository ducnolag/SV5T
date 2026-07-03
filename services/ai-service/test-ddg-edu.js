const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent('site:edu.vn "chứng nhận" "sinh viên 5 tốt"');
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 5000 });
        const $ = cheerio.load(res.data);
        const links = [];
        const titles = [];
        $('.result__url').each((i, el) => {
            links.push($(el).attr('href').split('&rut=')[0].replace('//duckduckgo.com/l/?uddg=', ''));
        });
        $('.result__title').each((i, el) => {
            titles.push($(el).text().trim());
        });
        for(let i=0; i<Math.min(5, links.length); i++){
            console.log(titles[i]);
            console.log(decodeURIComponent(links[i]));
            console.log('---');
        }
    } catch(e) {
        console.error(e.message);
    }
}
test();
