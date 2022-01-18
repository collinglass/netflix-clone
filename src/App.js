import React from 'react';
import './App.css';
import Row from './Row';
import request from './request';

function App() {
  return (
    <div className="App">
      <h1>Netflix-Clone</h1>
      <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
    </div>
  );
}

export default App;
