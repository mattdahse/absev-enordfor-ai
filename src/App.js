import React from 'react';
import JsonViewer from './components/JsonViewer';
import './App.css';

function App() {
  const jsonFile = 'https://path-to-your-json-file/file.json';

  return (
    <div className="App">
      <header className="App-header">
        <JsonViewer jsonFile={jsonFile} />
      </header>
    </div>
  );
}

export default App;
