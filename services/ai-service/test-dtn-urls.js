const axios = require('axios');
const cheerio = require('cheerio');
async function testURL(url) {
    try {
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
        const $ = cheerio.load(res.data);
        const title = $('title').text().trim();
        const img = $('meta[property="og:image"]').attr('content');
        console.log('SUCCESS:', title, '| img:', img, '| url:', url);
    } catch(e) {
        console.log('FAIL:', url);
    }
}
async function run() {
    await testURL('https://doanthanhnien.vn/tin-tuc/tuoi-tre-tien-phong-chuyen-doi-so/binh-dan-hoc-ai---pho-cap-ai-va-tap-huan-ky-nang-ai-cho-can-bo-doan-hoi');
    await testURL('https://doanthanhnien.vn/tin-tuc/hoat-dong-doan/tuyen-duong-thanh-nien-tien-tien-lam-theo-loi-bac-nam-2023');
    await testURL('https://doanthanhnien.vn/tin-tuc/hoat-dong-doan/khoi-dong-thang-thanh-nien-va-tet-trong-cay-doi-on-bac-ho-nam-2024');
    await testURL('https://doanthanhnien.vn/tin-tuc/hoat-dong-doan/giai-chay-bo-vi-suc-khoe-cong-dong-nam-2023');
    await testURL('https://doanthanhnien.vn/tin-tuc/hoat-dong-doan/chuong-trinh-giao-luu-thanh-nien-quoc-te-nam-2023');
}
run();
