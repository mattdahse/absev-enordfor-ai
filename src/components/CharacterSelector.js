import React, { useEffect, useState } from 'react';

const CharacterSelector = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');

  useEffect(() => {
    fetch('/characters.json')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error fetching character list:', error));
  }, []);

  const handleChange = (event) => {
    setSelectedCharacter(event.target.value);
    onSelectCharacter(event.target.value);
  };

  return (
    <div>
      <h2>Select a Character</h2>
      <select value={selectedCharacter} onChange={handleChange}>
        <option value="">--Select a character--</option>
        {characters.map(character => (
          <option key={character.file} value={character.file}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelector;
