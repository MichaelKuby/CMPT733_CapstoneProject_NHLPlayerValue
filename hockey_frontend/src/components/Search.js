import React, { useState, useEffect } from 'react';
import hockeyData from '../data/playersData.json'; // 确保路径正确
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState('');
  const [filteredResults, setFilteredResults] = useState({ teams: [], players: [] });
  // const navigate = useNavigate
  useEffect(() => {
    if (input.length > 0) {
      // 筛选队伍
      const teams = hockeyData.filter((team, index, self) =>
        index === self.findIndex((t) => (
          t.Team.toLowerCase() === team.Team.toLowerCase()
        )) && team.Team.toLowerCase().includes(input.toLowerCase())
      );
  
      // 筛选球员
      const players = hockeyData.filter(player =>
        player.player.toLowerCase().includes(input.toLowerCase())
      );
  
      setFilteredResults({ teams, players });
    } else {
      setFilteredResults({ teams: [], players: [] });
    }
  }, [input]);
  
  

  return (
    <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

    <div className="search-component">
      <input
        type="text"
        placeholder="Search for teams or players..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      {(filteredResults.teams.length > 0 || filteredResults.players.length > 0) && (
        <div className="results-dropdown">
          {filteredResults.teams.length > 0 && (
            <>
              <ul className="results-list">
                {filteredResults.teams.map((item, index) => (
                  <li key={`team-${index}`}>{item.Team}</li>
                ))}
              </ul>
              {filteredResults.players.length > 0 && <hr className="separator" />}
            </>
          )}
          {filteredResults.players.length > 0 && (
            <ul className="results-list">
              {filteredResults.players.map((item, index) => (
                <li key={`player-${index}`}>
                {/* <Route path="/player/${item.player}" component={PlayerDetail} /> */}  
                <Link to={`/player/${item.player}`} className="link-style">{item.player}</Link>
              </li>
              
              ))}
            </ul>
          )}
        </div>
      )}
    </div></div>
  );
};

export default Search;
