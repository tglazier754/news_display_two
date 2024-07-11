import { getFormattedDatePostedString } from "../../utils/timeConversion";
import "./NewsItem.css";

export const NewsItem = ({ data }) => {

    const dateDiff = getFormattedDatePostedString(data.publishedAt);

    console.log(dateDiff);

    return (
        <div className="news-item-container">
            <div className="source-info">
                {data.source.name} - {dateDiff}
            </div>
            <div className="title">{data.title}</div>
            <div className="article-body">{data.content}</div>
            <div className="read-more-link"><a href={data.url}>Read More</a></div>
        </div>
    );
}

export default NewsItem;