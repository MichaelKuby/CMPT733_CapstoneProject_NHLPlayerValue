import React, { useState, useEffect } from 'react';
import hockeyData from '../data/hockeyData.json'; // 确保路径正确

const Search = () => {
  const [input, setInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (input.length > 0) {
      const results = hockeyData.filter(team => team.Team.toLowerCase().includes(input.toLowerCase()) || team.player.toLowerCase().includes(input.toLowerCase()));
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [input]);

  return (
    <div className="search-component">
      <input
        type="text"
        placeholder="Search for teams or players..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {filteredResults.length > 0 && (
        <ul className="results-dropdown">
          {filteredResults.map((item, index) => (
            <li key={index}>
              <span>Team: {item.Team}, Player: {item.player}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
