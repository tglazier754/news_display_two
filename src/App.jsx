import logo from './logo.svg';
import './App.css';
import { useRef, useState, useEffect } from 'react';
import { bulkDownloads } from "./utils/downloads";

function App() {

  const dataStore = useRef({});
  const [store, setStore] = useState(dataStore.current);

  const save = (key, value) => {
    dataStore.current = { ...dataStore.current, [key]: value };
    setStore(
      dataStore.current
    );
  }

  useEffect(() => {
    bulkDownloads(["https://jsonplaceholder.typicode.com/todos/1", "https://jsonplaceholder.typicode.com/comments", "https://jsonplaceholder.typicode.com/posts"], save)
  }, []);

  useEffect(() => { console.log(store) }, [store]);

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
