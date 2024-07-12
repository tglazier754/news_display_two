import { useMemo, useState, useRef, useEffect } from "react";
import { processNewsData } from "../../controllers/newsController";
import NewsItem from "./NewsItem";
import "./News.css";

export const News = ({ data }) => {

    const processedData = useMemo(() => { return processNewsData(data) }, [data]);

    const [activeArticle, setActiveArticle] = useState(0);

    const animationInterval = useRef();

    useEffect(() => {
        //timer for changing the active screen
        //TODO: add proper animation classes here to fade or slide in/out
        animationInterval.current = setTimeout(() => {
            if (activeArticle === processedData.length - 1) {
                setActiveArticle(0);
            }
            else setActiveArticle(activeArticle + 1);
        }, 5000);

        return () => {
            clearTimeout(animationInterval.current);
        }

    }, [activeArticle]);



    if (!processedData || processedData.length === 0 || !processedData[activeArticle]) return null;

    return (
        <div className="news-container">
            <NewsItem key={`active-article-${activeArticle}`} data={processedData[activeArticle]} />
        </div>
    );
}

export default News;