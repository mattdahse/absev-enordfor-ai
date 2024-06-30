import React, { useEffect, useState } from 'react';
import CharacterSheet from './CharacterSheet';

const JsonViewer = ({ jsonFile, imagePath }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, [jsonFile]);

  return (
    <div>
      <CharacterSheet character={data} imagePath={imagePath} />
      <a href={jsonFile} download="data.json">Download JSON</a>
    </div>
  );
};

export default JsonViewer;
