import './App.css';
import { Weather } from './components/weather/Weather';
import ScoreTicker from './components/sports/ScoreTicker';
import { useBulkDownload } from "./hooks/useBulkDownload";
import News from './components/news/News';

function App() {

  //storing this here for now - the correct way to handle API keys is to have them stored on the backend,
  //and access a proxy endpoint that includes authorization and caching. Doing things this way opens us up
  //to being spammed. This is for demonstration purposes though.
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

  //To kick this project off, we're loading files directly from the frontend
  //The ideal situation is to pull and store the files on a backend so that it will scale
  //If we have 1000 clients, we will make 1000 api calls like this
  //If we have a backend, 1000 clients will still result in only 1 api call if it is done on a backend

  //TODO: grab the data more directly, stored in a useMemo instead of this custom hook
  /*const { store } = useBulkDownload([
    { key: "weather", url: "https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=79.38&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=6" },
    { key: "mlb", url: "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1" },
    { key: "news", url: `https://newsapi.org/v2/everything?q=tech&sortBy=publishedAt&language=en&apiKey=${newsApiKey}` }])*/

  //https://newsapi.org/v2/everything?q=tech&sortBy=publishedAt&language=en&apiKey=20f3c836ab7146f7965a8ebb78c425b4

  const { store } = useBulkDownload([
    { key: "weather", url: "/test_data/weather_forecast_july092024.json" },
    { key: "mlb", url: "/test_data/mlbScores_July092024_morning.json" },
    { key: "news", url: "/test_data/news_July112024_afternoon.json" }]);

  return (
    <div className="App">
      <main>

        <div className="grid-wrapper">
          <div className="news-container">
            <News data={store["news"]} />
          </div>
          <div className="weather-container">
            <Weather data={store["weather"]} />
          </div>
          <div className="sports-container">
            <ScoreTicker mlb={store["mlb"]} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
