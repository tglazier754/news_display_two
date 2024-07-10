

export const processNewsData = (data) => {

    //The format of the news-api data is pretty much exactly what I want, no processing needed
    //I could decide to only show articles with images here or something similar though
    return data ? data.articles : [];
}