import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import Column from './Column';
import Header from './Header';
import '../styles/KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [ordering, setOrdering] = useState('priority'); // Default ordering
  
  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchData();
      console.log('Fetched data:', data); // Debugging log

      if (data && data.tickets) {
        setTickets(Array.isArray(data.tickets) ? data.tickets : []);
      } else {
        console.warn('No tickets found in fetched data');
        setTickets([]); // Clear tickets if data is invalid
      }
    };
    getTickets();
  }, []);

  const groupedTickets = () => {
    if (!Array.isArray(tickets) || tickets.length === 0) return {}; // Return an empty object if no tickets
    
    const group = tickets.reduce((acc, ticket) => {
      const key = ticket[grouping];
      if (!key) {
        console.warn(`Ticket does not have property ${grouping}`, ticket); // Debugging log
        return acc;
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});

    // Sort tickets in each group
    Object.keys(group).forEach((key) => {
      group[key].sort((a, b) => {
        if (ordering === 'priority') return b.priority - a.priority;
        return a.title.localeCompare(b.title);
      });
    });

    console.log('Grouped tickets:', group); // Debugging log
    return group;
  };

  return (
    <div className="kanban-board">
      <Header grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
      <div className="kanban-columns">
        {Object.entries(groupedTickets()).map(([key, tickets]) => (
          <Column key={key} title={key} tickets={tickets} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
