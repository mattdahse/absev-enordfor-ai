import React from 'react';
import JsonViewer from './components/JsonViewer';
import './App.css';

function App() {
  const jsonFile = 'https://mattdahse.github.io/absev-enordfor-ai/data.json';

  return (
    <div className="App">
      <header className="App-header">
        <JsonViewer jsonFile={jsonFile} />
      </header>
    </div>
  );
}

export default App;
