import { useMemo, useState } from "react";
import { processNewsData } from "../../controllers/newsController";


export const News = ({ data }) => {

    const processedData = useMemo(() => { return processNewsData(data) }, [data]);

    const [activeArticle, setActiveArticle] = useState(0);
    const activeArticleData = useMemo(() => { return processedData[activeArticle] }, [activeArticle]);
    //this could be placed into a use effect with an empty dependency array so that we can nullify it on unmount
    //timer for changing the active screen
    const animationTimer = setTimeout(() => {
        if (activeArticle === processedData.length - 1) {
            setActiveArticle(0);
        }
        else setActiveArticle(activeArticle + 1);
    }, 5000);

    if (!processedData || processedData.length === 0 || !activeArticleData) return null;

    return (
        <div className="news-container">
            <p>{activeArticleData.title}</p>
        </div>
    );
}

export default News;