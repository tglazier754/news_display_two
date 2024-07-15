

export const processNewsData = (data) => {

    //The format of the news-api data is pretty much exactly what I want, no processing needed
    //I could decide to only show articles with images here or something similar though

    const filtered = data && data.articles ? data.articles.filter(((value) => { return value.title ? value.title.toLowerCase().lastIndexOf("removed") < 0 : false })) : [];
    return filtered ? filtered : [];
}