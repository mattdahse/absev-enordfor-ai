import React, { useEffect, useState } from 'react';
import CharacterSheet from './CharacterSheet';

const JsonViewer = ({ jsonFile }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}${jsonFile}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, [jsonFile]);

  return (
    <div>
      <CharacterSheet character={data} />
      <a href={jsonFile} download="data.json">Download JSON</a>
    </div>
  );
};

export default JsonViewer;
