import React, { useState } from 'react';
import JsonViewer from './components/JsonViewer';
import CharacterSelector from './components/CharacterSelector';
import './App.css';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="App">
      <header className="App-header">
        <CharacterSelector onSelectCharacter={handleSelectCharacter} />
        {selectedCharacter && (
          <JsonViewer 
            jsonFile={selectedCharacter.file}
            imagePath={`${process.env.PUBLIC_URL}/${selectedCharacter.image}`}
          />
        )}
      </header>
    </div>
  );
}

export default App;
