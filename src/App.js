import React, { useState } from 'react';
import JsonViewer from './components/JsonViewer';
import CharacterSelector from './components/CharacterSelector';
import './App.css';

function App() {
  const [selectedCharacterFile, setSelectedCharacterFile] = useState('');

  const handleSelectCharacter = (characterFile) => {
    setSelectedCharacterFile(characterFile);
  };

  return (
    <div className="App">
      <header className="App-header">
        <CharacterSelector onSelectCharacter={handleSelectCharacter} />
        {selectedCharacterFile && <JsonViewer jsonFile={`/${selectedCharacterFile}`} />}
      </header>
    </div>
  );
}

export default App;
