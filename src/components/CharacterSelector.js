import React, { useEffect, useState } from 'react';

const CharacterSelector = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/characters.json`)
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error('Error fetching character list:', error));
  }, []);

  const handleChange = (event) => {
    const selected = characters.find(character => character.file === event.target.value);
    setSelectedCharacter(selected);
    onSelectCharacter(selected);
  };

  return (
    <div>
      <h2>Select a Character</h2>
      <select value={selectedCharacter?.file || ''} onChange={handleChange}>
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
