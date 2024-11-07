import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExampleComponent from './ExampleComponent';

function App() {
  return (
    <div className="App">
      <Router>
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
        </header>

        {/* Define the routes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<ExampleComponent />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

// Home component to display on the root path "/"
function Home() {
  return (
    <div>
      <h1>Welcome to SomniGuard</h1>
      <p>Sleep Smarter, Wake Happier.</p>
    </div>
  );
}

export default App;
