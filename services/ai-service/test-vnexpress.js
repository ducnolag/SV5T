const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
    try {
        const res = await axios.get('https://timkiem.vnexpress.net/?q=sinh+viên+tình+nguyện');
        const $ = cheerio.load(res.data);
        $('.title-news a').each((i, el) => {
            console.log($(el).text().trim());
            console.log($(el).attr('href'));
        });
    } catch(e) {
        console.error(e.message);
    }
}
test();
