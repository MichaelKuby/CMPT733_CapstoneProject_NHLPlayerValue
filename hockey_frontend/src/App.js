import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Teams from './components/Teams';
import Players from './components/Players';
import Search from './components/Search';
import NavBar from './components/Navbar';
import PlayerDetail from './components/PlayerDetail';
import CustomizedTables from './components/PlayerStatsAll';
import { useNavigate } from 'react-router-dom';
import './App.css'; // 确保你有一个App.css文件来添加样式


function App() {
  // 如果你在这里使用 useLocation，需要确保它在Router组件的内部使用
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home_new />} />
          <Route path="/playerStatsAll" element ={<CustomizedTables />}/>
          <Route path="/player/:playerName" element={<PlayerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home_new() {
  // 这里使用 useLocation 如果需要
  return (
    <div>
      <div className="background-blur"></div> 
      <div className="content">
        <Search />
        {/* 更多主页内容 */}
      </div>
    </div>
  );
}


export default App;
