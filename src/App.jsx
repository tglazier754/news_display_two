import logo from './logo.svg';
import './App.css';
import { useBulkDownload } from './hooks/useBulkDownload';
import { Weather } from './components/weather/Weather';

function App() {

  //To kick this project off, we're loading files directly from the frontend
  //The ideal situation is to pull and store the files on a backend so that it will scale
  //If we have 1000 clients, we will make 1000 api calls like this
  //If we have a backend, 1000 clients will still result in only 1 api call if it is done on a backend
  const { store } = useBulkDownload([
    { key: "weather", url: "https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=79.38&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=6" },
    { key: "sports", url: "https://jsonplaceholder.typicode.com/comments" },
    { key: "news", url: "https://jsonplaceholder.typicode.com/posts" }])

  return (
    <div className="App">
      <main>

        <div class="grid-wrapper">
          <div class="news-container"><p>news</p></div>
          <div class="weather-container">
            <Weather data={store["weather"]} />
          </div>
          <div class="sports-container"><p>sports</p></div>
        </div>
      </main>
    </div>
  );
}

export default App;
