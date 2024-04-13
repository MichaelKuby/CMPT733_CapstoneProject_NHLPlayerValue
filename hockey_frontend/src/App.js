import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Search from './components/Search';
import NavBar from './components/Navbar';
import PlayerDetail from './components/PlayerDetail';
import CustomizedTables from './components/PlayerStatsAll';
import './App.css'; // 确保你有一个App.css文件来添加样式
import MyChartComponent from './components/PlayerStats_New';
import MyEChartsComponent from './components/mutipleChart'
import NutrientChart from './components/scatterPlot';
import EnhancedTable from './components/Teams'
import EnhancedTable2 from './components/PlayerStatsAll';
function Home_new() {
  return (
    <div>
      <div className="background-blur"></div> 
      <div className="content">
        <Search />
      </div>
    </div>
  );
}
function PlayerDetailWithGraph() {
  return (
    <div>
    <MyChartComponent/>
    <PlayerDetail/>
  </div>
  );
}
function PlayersStats() {
  return (
    <div className='scrollable-div'>
    <div className="left-component"><MyEChartsComponent/></div>
    <div><NutrientChart/></div>
  </div>
  
    
  );
}
function App() {
  
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Home_new />} />
          <Route path="/players" element ={<EnhancedTable2/>}/>
          <Route path="/player/:playerName" element={<PlayerDetailWithGraph />} />
          <Route path="/Statitics" element={<NutrientChart />} />
          <Route path="/teams/:teamName" element={<EnhancedTable />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
