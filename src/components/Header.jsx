
import React, { useState } from 'react';

import '../styles/Header.css';


const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <div className="menu" onClick={toggleMenu}>
        <div className="menu-icon">☰</div>
        <span className="menu-title">Display</span>
      </div>
      {isOpen && (
        <div className="options">
          <div className="grouping">
            <label>Grouping:</label>
            <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
              <option value="status">Status</option>
              {/* <option value="assignee">Assignee</option> */}
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="ordering">
            <label>Ordering:</label>
            <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
