import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// 假设你的JSON数据已经按照之前的格式导入
import jsonData from '../data/player_all_salary.json';

function PlayerStats() {
  const { playerName } = useParams(); // 从URL获取玩家名
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    // 查找匹配的玩家数据
    const data = jsonData.players.find(player => player.name === playerName);
    if (data) {
      setPlayerData(data.years);
    }
  }, [playerName]);

  return (
    <Box sx={{ width: '100%' }}>
      <h1>{playerName}</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">GP</TableCell>
                <TableCell align="right">POSITION</TableCell>
                <TableCell align="right">TOI</TableCell>
                <TableCell align="right">IPP</TableCell>
                <TableCell align="right">PRED/ACTUAL</TableCell>
                <TableCell align="right">GOALS</TableCell>
                <TableCell align="right">SHOTS</TableCell>
                <TableCell align="right">TAKEAWAYS</TableCell>
                <TableCell align="right">HITS</TableCell>
                {/* 添加更多的列头 */}
              </TableRow>
            </TableHead>
            <TableBody>
              {playerData.map((yearData) => (
                <TableRow
                  key={yearData.year}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {yearData.year}
                  </TableCell>
                  <TableCell align="right">{yearData.stats.GP}</TableCell>
                  <TableCell align="right">{yearData.stats.POSITION}</TableCell>
                  <TableCell align="right">{yearData.stats.TOI}</TableCell>
                  <TableCell align="right">{yearData.stats.IPP}</TableCell>
                  <TableCell align="right">{yearData.stats.PERCENTAGE}</TableCell>
                  <TableCell align="right">{yearData.stats.GOALS}</TableCell>
                  <TableCell align="right">{yearData.stats.SHOTS}</TableCell>
                  <TableCell align="right">{yearData.stats.TAKEAWAYS}</TableCell>
                  <TableCell align="right">{yearData.stats.HITS}</TableCell>

                  {/* <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {yearData.stats.name}
                    </TableCell>
                    <TableCell align="right">{yearData.stats.season}</TableCell>
                    
                    <TableCell align="right">{yearData.stats.POSITION}</TableCell>
                    <TableCell align="right">{yearData.stats.GP}</TableCell>
                    <TableCell align="right">{yearData.stats.TOI}</TableCell>
                    <TableCell align="right">{yearData.stats.IPP}</TableCell>
                   
                    <TableCell align="right">{yearData.stats.PERCENTAGE}</TableCell>
                    <TableCell align="right" style={{ fontSize: '32px' }}>
                      {countryFlags[yearData.stats.countryCode] || '🇺🇳'}
                    </TableCell>
                    <TableCell align="right">{yearData.stats.GOALS}</TableCell>
                    <TableCell align="right">{yearData.stats.SHOTS}</TableCell>
                    <TableCell align="right">{yearData.stats.TAKEAWAYS}</TableCell>
                    
                    <TableCell align="right">{yearData.stats.HITS}</TableCell> */}
                  {/* 渲染更多的列数据 */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default PlayerStats;
