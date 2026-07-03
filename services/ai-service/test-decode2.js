const axios = require('axios');
async function run() {
    const urls = [
        'https://www.facebook.com/groups/1059695361746080/posts/1185947449120870/',
        'https://www.facebook.com/ictsv.hust/photos/544238617075223/',
        'https://www.facebook.com/groups/ctustudents.official/permalink/1978490082771020/'
    ];
    for (const url of urls) {
        try {
            await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 });
            console.log('SUCCESS:', url);
        } catch(e) {
            console.log('FAIL:', url);
        }
    }
}
run();
