import React, { useState, useEffect } from 'react';
import CharacterSheet from './CharacterSheet';

const JsonViewer = ({ selectedCharacter }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const publicUrl = process.env.PUBLIC_URL || '';
    console.log('Fetching characters.json');
    fetch(`${publicUrl}/characters.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(characters => {
        console.log('Fetched characters:', characters);
        setCharacters(characters);
      })
      .catch(error => {
        console.error('Error fetching characters.json:', error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    const publicUrl = process.env.PUBLIC_URL || '';
    console.log('Selected character:', selectedCharacter);
    if (selectedCharacter && characters.length > 0) {
      const character = characters.find(c => c.name === selectedCharacter);
      if (character) {
        console.log('Fetching character file:', character.file);
        fetch(`${publicUrl}/${character.file}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Fetched character data:', data);
            setData(data);
          })
          .catch(error => {
            console.error('Error fetching character file:', error);
            setError(error);
          });
      } else {
        console.error('Character not found:', selectedCharacter);
        setError(new Error(`Character not found: ${selectedCharacter}`));
      }
    }
  }, [selectedCharacter, characters]);

  if (error) {
    return <div>Error fetching JSON: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const publicUrl = process.env.PUBLIC_URL || '';

  return (
    <CharacterSheet 
      character={data} 
      imagePath={`${publicUrl}/images/${data.Name.toLowerCase().replace(/\s+/g, '-')}.webp`} 
    />
  );
};

export default JsonViewer;
