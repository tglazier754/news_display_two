
//urls is an array of objects of type {keyName:string, url:string}

export const bulkDownloads = async (dataObjects, save, abortSignal, concurrency = 3) => {
    //for each entry in urls, call fetch
    //after getting the data, call save using the url as the key

    let counter = 0;

    const currentConcurrency = dataObjects.length < concurrency ? dataObjects.length : concurrency;


    const action = () => {
        let i = counter++;

        const currentUrl = dataObjects[i];

        return fetch(currentUrl.url, { abortSignal }).then((result) => {

            result.json().then((body) => {
                return save(currentUrl.key, body);
            });
        }).catch(error => {
            return save(currentUrl.key, error);
        }).finally(() => {
            if (dataObjects.length - 1 - i < currentConcurrency) {
                return;
            } else { return action(); }
        })
    }

    return Promise.all(Array.from({ length: currentConcurrency }, action));


}


export const bulkDownloadsPromise = (dataObjects) => {
    console.log("bulkDownloads");

    const promises = dataObjects.map((dataObject) => {
        return fetch(dataObject.url);
    })

    return Promise.allSettled(promises);
}