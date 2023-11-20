// fetch current website url
chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
let currentUrl = tabs[0].url;

// check if we are fetching correct url
console.log(currentUrl);

// display URL on HTML
// document.getElementById("currentURL").innerHTML = currentUrl;

// slice url before concatenating
let slicedUrl = currentUrl.slice(8);

// use Article Data Extraction and Text Mining API to fetch data to be summarized
const url0 = 'https://lexper.p.rapidapi.com/v1.1/extract?url=https%3A%2F%2F' + slicedUrl;

// check if url0 is correct
console.log(url0)

const options0 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '368fc61910msh5229c8482c7e7ebp1d788fjsn5f2a20926e62',
        'X-RapidAPI-Host': 'lexper.p.rapidapi.com'
    }
};

try {
    const response0 = await fetch(url0, options0);
    const result0 = await response0.text();
    console.log(result0);

    // use TextGears API to generate summary
    const url = 'https://textgears-textgears-v1.p.rapidapi.com/summarize';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '368fc61910msh5229c8482c7e7ebp1d788fjsn5f2a20926e62',
            'X-RapidAPI-Host': 'textgears-textgears-v1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            text: result0,
            max_sentences: '2'
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        console.log(result.length)

        // substring to include summary only
        let summaryPosition = result.indexOf("\"summary\":") + 11;
        console.log(summaryPosition)
        let substringResult = result.substring(summaryPosition, result.length - 4);
        console.log(substringResult)

        // regex to remove special characters
        let cleanSummary = substringResult.replace(/<\/?[^>\n]+(>|$)/g, '')
        let cleanSummary2 = cleanSummary.replace(/\\u[0-9a-fA-F]{4}/g, '')
        let cleanSummary3 = cleanSummary2.replace(/\\n/g, '')
        let cleanSummary4 = cleanSummary3.replace(/\\/g, '')
        console.log(cleanSummary4)

        if (cleanSummary4.length>200) {
            // display summary on HTML
            document.getElementById("summary").innerHTML = cleanSummary4;
        } else {
            document.getElementById("summary").innerHTML = "*Summary unavailable for this site*";
        }
        

    } catch (error) {
        console.error(error);
    }

} catch (error) {
    console.error(error);
}

});
