import React, { useState, useEffect } from 'react';
import JsonViewer from './components/JsonViewer';

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/characters.json`)
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error fetching characters.json:', error));
  }, []);

  const handleCharacterChange = (event) => {
    setSelectedCharacter(event.target.value);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Character Viewer</h1>
        <select onChange={handleCharacterChange} value={selectedCharacter}>
          <option value="">Select a character</option>
          {characters.map(character => (
            <option key={character.name} value={character.name}>
              {character.name}
            </option>
          ))}
        </select>
      </header>
      {selectedCharacter && <JsonViewer selectedCharacter={selectedCharacter} />}
    </div>
  );
};

export default App;
