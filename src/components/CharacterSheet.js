import React from 'react';

const CharacterSheet = ({ character, imagePath }) => {
  if (!character) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-info">
          <h1>{character.Name}</h1>
          <h2>{character.Race} {character.Class} - Level {character.Level}</h2>
          <h3>Alignment: {character.Alignment}</h3>
        </div>
        <img src={imagePath} alt="Character in action" className="character-image" />
      </div>

      <div className="columns">
        <div className="column">
          <div className="hit-points section">
            <h3>Hit Points</h3>
            <p>{character.HP}</p>
            <p>Current HP: __________</p>
          </div>
          <h3>Attributes</h3>
          <table>
            <tbody>
              {Object.entries(character.Abilities).map(([key, value]) => (
                <tr key={key}><th>{key}</th><td>{value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="column">
          <h3>Combat Stats</h3>
          <table>
            <tbody>
              <tr><th>AC</th><td>{character.AC}</td></tr>
              <tr><th>Initiative</th><td>{character.Initiative}</td></tr>
              <tr><th>Speed</th><td>{character.Speed}</td></tr>
              {Object.entries(character.Attacks).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value.AttackBonus}</td>
                  <td>{value.Damage}</td>
                  <td>{value.Special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="column">
          <h3>Skills</h3>
          <table>
            <tbody>
              {Object.entries(character.Skills).map(([key, value]) => (
                <tr key={key}><th>{key}</th><td>{value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="equipment section">
        <h3>Equipment</h3>
        <table>
          <tbody>
            {Object.entries(character.Equipment).map(([key, value]) => (
              <tr key={key}><th>{key}</th><td>{value}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="special-abilities section">
        <h3>Special Abilities</h3>
        <ul>
          {Object.entries(character['Special Abilities']).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> 
              {typeof value === 'object' ? (
                <ul>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <li key={subKey}>{subKey}: {subValue}</li>
                  ))}
                </ul>
              ) : (
                value
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="feats section">
        <h3>Feats</h3>
        <ul>
          {character.Feats.map((feat, index) => (
            <li key={index}>{feat}</li>
          ))}
        </ul>
      </div>

      <div className="languages section">
        <h3>Languages</h3>
        <ul>
          {character.Languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>

      {character.Spellbook && (
        <div className="spellbook section">
          <h3>Spellbook</h3>
          {Object.entries(character.Spellbook).map(([level, spells]) => (
            <div key={level}>
              <h4>{level}</h4>
              <ul>
                {spells.map(spell => (
                  <li key={spell.name}>
                    <a href={spell.url} target="_blank" rel="noopener noreferrer">{spell.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {character.Memorized && (
        <div className="memorized section">
          <h3>Memorized Spells</h3>
          {Object.entries(character.Memorized).map(([level, data]) => (
            <div key={level}>
              <h4>{level} (Spells per day: {data.number_of_spells})</h4>
              <ul>
                {data.spells.map(spell => (
                  <li key={spell.name}>
                    <a href={spell.url} target="_blank" rel="noopener noreferrer">{spell.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterSheet;
