import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './CharacterSheet.css';

const convertMoney = (money) => {
  const gold = Math.floor(money);
  const silver = Math.floor((money - gold) * 10);
  const copper = Math.floor(((money - gold) * 10 - silver) * 10);
  return { gold, silver, copper };
};

const CharacterSheet = ({ character, imagePath }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [editableField, setEditableField] = useState('');
  const [editableKey, setEditableKey] = useState('');
  const [data, setData] = useState(character);
  const [currentHP, setCurrentHP] = useState(character ? character.HP : null);

  useEffect(() => {
    if (character) {
      const localStorageKey = `characterData_${character.Name}`;
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
        setCurrentHP(parsedData.currentHP || parsedData.HP);
      } else {
        setData(character);
        setCurrentHP(character.HP);
      }
    }
  }, [character]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const money = convertMoney(data.Money);

  const openModal = (field, key, value) => {
    setEditableField(field);
    setEditableKey(key);
    setModalContent(value);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
    setEditableField('');
    setEditableKey('');
  };

  const saveChanges = () => {
    let updatedData = { ...data };

    if (editableField === 'Equipment' || editableField === 'Notes') {
      updatedData[editableField][editableKey] = modalContent;
    } else if (editableField === 'Memorized') {
      const [level, index] = editableKey.split('-');
      updatedData.Memorized[level].spells[parseInt(index, 10)] = modalContent;
    } else if (editableField === 'currentHP') {
      setCurrentHP(modalContent);
      updatedData = { ...updatedData, currentHP: modalContent };
    } else {
      updatedData = { ...updatedData, [editableField]: modalContent };
    }

    const localStorageKey = `characterData_${data.Name}`;
    setData(updatedData);
    setModalOpen(false);
    setEditableField('');
    setEditableKey('');
    setModalContent('');

    localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
  };

  const deleteProperty = () => {
    let updatedData = { ...data };

    if (editableField === 'Equipment' || editableField === 'Notes') {
      delete updatedData[editableField][editableKey];
    } else if (editableField === 'Memorized') {
      const [level, index] = editableKey.split('-');
      updatedData.Memorized[level].spells.splice(parseInt(index, 10), 1);
    }

    const localStorageKey = `characterData_${data.Name}`;
    setData(updatedData);
    setModalOpen(false);
    setEditableField('');
    setEditableKey('');
    setModalContent('');

    localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
  };

  const addEquipment = () => {
    const newKey = prompt('Enter the name of the new equipment item:');
    if (newKey) {
      const updatedData = { ...data, Equipment: { ...data.Equipment, [newKey]: '' } };
      setData(updatedData);
      const localStorageKey = `characterData_${data.Name}`;
      localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
    }
  };

  const addNote = () => {
    const newKey = prompt('Enter the title of the new note:');
    if (newKey) {
      const updatedData = { ...data, Notes: { ...data.Notes, [newKey]: '' } };
      setData(updatedData);
      const localStorageKey = `characterData_${data.Name}`;
      localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
    }
  };

  const resetData = () => {
    const localStorageKey = `characterData_${data.Name}`;
    localStorage.removeItem(localStorageKey);
    setData(character);
    setCurrentHP(character.HP);
  };

  const exportToFile = () => {
    const localStorageKey = `characterData_${data.Name}`;
    const savedData = localStorage.getItem(localStorageKey);
    const blob = new Blob([savedData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const fileName = `${data.Name.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.download = fileName;
    link.click();
  };

  const publicUrl = process.env.PUBLIC_URL || '';
  const imageUrl = `${publicUrl}/images/${data.Name.toLowerCase().replace(/\s+/g, '-')}.webp`;

  return (
    <div className="character-sheet">
      <div className="container">
        <div className="header">
          <div className="header-info">
            <h1>{data.Name}</h1>
            <h2>{data.Race} {data.Class} - Level {data.Level}</h2>
            <h3>Alignment: {data.Alignment}</h3>
          </div>
          <img src={imageUrl} alt="Character in action" className="character-image" />
        </div>

        <button onClick={resetData}>Reset Data</button>
        <button onClick={exportToFile}>Export to File</button>

        <div className="columns">
          <div className="column">
            <div className="hit-points section">
              <h3>Hit Points</h3>
              <p>{data.HP}</p>
              <h3>Current HP <img src="/pencil.png" alt="Edit" onClick={() => openModal('currentHP', '', currentHP)} className="edit-icon" /></h3>
              <p>{currentHP}</p>
            </div>
            <h3>Attributes</h3>
            <table>
              <tbody>
                {Object.entries(data.Abilities).map(([key, value]) => (
                  <tr key={key}><th>{key}</th><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="column">
            <h3>Combat Stats</h3>
            <table>
              <tbody>
                <tr><th>AC</th><td colSpan="3">{data.AC}</td></tr>
                <tr><th>Initiative</th><td colSpan="3">{data.Initiative}</td></tr>
                <tr><th>Speed</th><td colSpan="3">{data.Speed}</td></tr>
                {Object.entries(data.Attacks).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value["Attack Bonus"]}</td>
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
                {Object.entries(data.Skills).map(([key, value]) => (
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
              {Object.entries(data.Equipment).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                  <td><img src="/pencil.png" alt="Edit" onClick={() => openModal('Equipment', key, value)} className="edit-icon" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addEquipment}>Add New Equipment</button>
        </div>

        <div className="money section">
          <h3>Money <img src="/pencil.png" alt="Edit" onClick={() => openModal('Money', '', data.Money)} className="edit-icon" /></h3>
          <p>{money.gold} gp, {money.silver} sp, {money.copper} cp</p>
        </div>

        <div className="special-abilities section">
          <h3>Special Abilities</h3>
          <ul>
            {Object.entries(data['Special Abilities']).map(([key, value]) => (
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
            {data.Feats.map((feat, index) => (
              <li key={index}>{feat}</li>
            ))}
          </ul>
        </div>

        <div className="languages section">
          <h3>Languages</h3>
          <ul>
            {data.Languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>

        <div className="experience-points section">
          <h3>Experience Points <img src="/pencil.png" alt="Edit" onClick={() => openModal('Experience Points', '', data['Experience Points'])} className="edit-icon" /></h3>
          <p>{data['Experience Points']}</p>
        </div>

        <div className="notes section">
          <h3>Notes</h3>
          <table>
            <tbody>
              {Object.entries(data.Notes).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                  <td><img src="/pencil.png" alt="Edit" onClick={() => openModal('Notes', key, value)} className="edit-icon" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addNote}>Add New Note</button>
        </div>

        {data.Spellbook && (
          <div className="spellbook section">
            <h3>Spellbook</h3>
            {Object.entries(data.Spellbook).map(([level, spells]) => (
              <div key={level}>
                <h4>{level}</h4>
                <ul>
                  {spells.map((spell, index) => (
                    <li key={`${spell.name}-${index}`}>
                      <a href={spell.url} target="_blank" rel="noopener noreferrer">{spell.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.Memorized && (
          <div className="memorized section">
            <h3>Memorized Spells</h3>
            {Object.entries(data.Memorized).map(([level, memorized]) => (
              <div key={level}>
                <h4>{level}</h4>
                <ul>
                  {memorized.spells.map((spell, index) => (
                    <li key={`${spell}-${index}`}>
                      {spell}
                      <img src="./pencil.png" alt="Edit" onClick={() => openModal('Memorized', `${level}-${index}`, spell)} className="edit-icon" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onSave={saveChanges} 
          onDelete={editableField === 'Equipment' || editableField === 'Notes' || editableField === 'Memorized' ? deleteProperty : null}
          title={`Edit ${editableField} ${editableKey}`}
        >
          {editableField === 'Memorized' ? (
            <select value={modalContent} onChange={(e) => setModalContent(e.target.value)}>
              {data.Spellbook[editableKey.split('-')[0]].map((spell, index) => (
                <option key={`${spell.name}-${index}`} value={spell.name}>{spell.name}</option>
              ))}
            </select>
          ) : (
            <textarea 
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              rows="10" 
              cols="30"
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CharacterSheet;
