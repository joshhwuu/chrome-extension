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
            max_sentences: '1'
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        console.log(result.length)

        // substring to include summary only
        let summaryPosition = result.indexOf("\"summary\":") + 12;
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
            document.getElementById("summary").innerHTML = "* Summary unavailable for this site *";
        }
        

    } catch (error) {
        console.error(error);
    }

} catch (error) {
    console.error(error);
}

const url = 'https://api-v2.agenthub.dev/remote_start_pipeline';
const headers = {
    'Content-Type': 'application/json',
    'x-auth-key': 'D0MQIhCfnnR2fkDiqLT7OUcmjBp1'
};
const data = {
    user_id: 'D0MQIhCfnnR2fkDiqLT7OUcmjBp1',
    saved_item_id: 't8PyvTxChJDyJWVVSDGunf',
    api_key: 'a411352ee2884787947d60f23fec6dd5',
    openai_token: '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',
    pipeline_inputs: [
        { input_name: 'URL', value: currentUrl }
    ],
};

const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
})
let str = await response.json();
console.log(str);
const run_id = str.slice(37);

const url1 = 'https://api-v2.agenthub.dev/plrun?run_id=' + run_id;
console.log(url1);
const headers1 = {
    'x-auth-key': 'D0MQIhCfnnR2fkDiqLT7OUcmjBp1',
};
let arr;

function pollEndpoint() {

    const fetchData = () => {
        fetch(url1, {
            method: 'GET',
            headers: headers1
        })
            .then(response => response.json())
            .then(data => {
                const state = data.state;
                if (state === 'DONE') {
                    console.log(data.outputs);
                    document.getElementById("flashcards").innerHTML = data.outputs["str"];
                    clearInterval(polling);
                } else if (state === 'FAILED' || state === 'TERMINATED') {
                    console.log('Failed');
                    clearInterval(polling);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                clearInterval(polling);
            });
    };
    const polling = setInterval(fetchData, 2000);
}

pollEndpoint();

});
