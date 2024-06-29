import logo from './logo.svg';
import './App.css';
import { useBulkDownload } from './hooks/useBulkDownload';

function App() {

  const { store } = useBulkDownload([
    { key: "weather", url: "https://jsonplaceholder.typicode.com/todos/1" },
    { key: "sports", url: "https://jsonplaceholder.typicode.com/comments" },
    { key: "news", url: "https://jsonplaceholder.typicode.com/posts" }])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{Object.keys(store).length}</p>
      </header>
    </div>
  );
}

export default App;
