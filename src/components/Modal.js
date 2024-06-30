import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSave, onDelete, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">x</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={onSave} className="save-button">Save</button>
          {onDelete && <button onClick={onDelete} className="delete-button">Delete</button>}
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
