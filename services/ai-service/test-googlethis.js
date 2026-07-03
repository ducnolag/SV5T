const google = require('googlethis');
async function test() {
    const options = {
        page: 0, 
        safe: false, // Safe Search
        parse_ads: false, // If set to true sponsored results will be parsed
        additional_params: { 
            // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoptimer.com/blog/google-search-parameters/
            hl: 'vi' 
        }
    }
    
    try {
        const response = await google.search('site:facebook.com "sinh viên" "tình nguyện" "chứng nhận"', options);
        console.log('Results:', response.results.length);
        if(response.results.length > 0) {
            console.log(response.results[0]);
        }
    } catch (e) {
        console.error(e);
    }
}
test();
