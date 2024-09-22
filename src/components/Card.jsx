import React from 'react';
import '../styles/Card.css';

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{ticket.title}</h3>
      </div>
      <p>{ticket.description}</p>
      <span>Priority: {ticket.priority}</span>
    </div>
  );
};

export default Card;
