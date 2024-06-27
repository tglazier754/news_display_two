export const bulkDownloads = async (urls, save, concurrency = 3) => {
    //for each entry in urls, call fetch
    //after getting the data, call save using the url as the key

    let counter = 0;

    const currentConcurrency = urls.length < concurrency ? urls.length : concurrency;


    const action = () => {
        let i = counter++;

        const currentUrl = urls[i];

        return fetch(currentUrl).then((result) => {
            return save(currentUrl, result);
        }).catch(error => {
            return save(currentUrl, error);
        }).finally(() => {
            if (urls.length - 1 - i < currentConcurrency) {
                return;
            } else { return action(); }
        })
    }

    return Promise.all(Array.from({ length: currentConcurrency }, action));


} 