const { search, SafeSearchType } = require('duck-duck-scrape');
async function test() {
    try {
        const query = 'site:facebook.com "sinh viên" "chứng nhận" "tình nguyện"';
        const searchResults = await search(query, {
            safeSearch: SafeSearchType.OFF
        });
        console.log('Results:', searchResults.results.length);
        if(searchResults.results.length > 0) {
            console.log(searchResults.results[0]);
        }
    } catch(e) {
        console.error(e.message);
    }
}
test();
