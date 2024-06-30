import React, { useEffect, useState } from 'react';

const JsonViewer = ({ jsonFile }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, [jsonFile]);

  return (
    <div>
      <h1>JSON Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
      <a href={jsonFile} download="data.json">Download JSON</a>
    </div>
  );
};

export default JsonViewer;

