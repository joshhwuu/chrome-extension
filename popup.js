// fetch current website url
chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
    let currentUrl = tabs[0].url;

    // check if we are fetching correct url
    console.log(currentUrl);

    // display URL on HTML
    document.getElementById("currentURL").innerHTML = currentUrl;

    // slice url before concatenating
    let slicedUrl = currentUrl.slice(8);

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

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => console.log(data));

    
    


    
});

