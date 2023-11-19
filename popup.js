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

    
    


    // // get article data with API
    // const url0 = 'https://lexper.p.rapidapi.com/v1.1/extract?url=https%3A%2F%2F' + slicedUrl;

    // // check if url0 is correct
    // console.log(url0)

    // const options0 = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '368fc61910msh5229c8482c7e7ebp1d788fjsn5f2a20926e62',
    //         'X-RapidAPI-Host': 'lexper.p.rapidapi.com'
    //     }
    // };

    // try {
    //     const response0 = await fetch(url0, options0);
    //     const result0 = await response0.text();
    //     console.log(result0);

    //     // use TextGears API to generate summary
    //     const url = 'https://textgears-textgears-v1.p.rapidapi.com/summarize';
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/x-www-form-urlencoded',
    //             'X-RapidAPI-Key': '368fc61910msh5229c8482c7e7ebp1d788fjsn5f2a20926e62',
    //             'X-RapidAPI-Host': 'textgears-textgears-v1.p.rapidapi.com'
    //         },
    //         body: new URLSearchParams({
    //             text: result0,
    //             max_sentences: '3'
    //         })
    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         const result = await response.text();
    //         console.log(result);
    //         console.log(result.length)
    // get article data with API
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

    //         //slice to include summary only
    //         let summaryPosition = result.indexOf("summary") + 8;
    //         console.log(summaryPosition)
    //         let slicedResult = currentUrl.slice(summaryPosition);
    //         console.log(slicedResult)

    //         // display summary on HTML
    //         document.getElementById("summary").innerHTML = slicedResult;

    //     } catch (error) {
    //         console.error(error);
    //     }

    // } catch (error) {
    //     console.error(error);
    // }


});

