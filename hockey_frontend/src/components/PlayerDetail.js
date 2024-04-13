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
  function convertToNumber(str) {
    // 去除字符串中的逗号
    const stringWithoutCommas = str.replace(/,/g, '');
    // 将结果转换为数字
    const number = Number(stringWithoutCommas);
    // 返回转换后的数字
    return number;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <h1 className="playerName">  {playerName}</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell>SEASON</TableCell>
<TableCell align="right">TEAM</TableCell>
{/* <TableCell align="right">NATIONALITY</TableCell> */}
<TableCell align="right">AGE</TableCell>
<TableCell align="right">POSITION</TableCell>
<TableCell align="right">CAP HIT</TableCell>
<TableCell align="right">SALARY</TableCell>
<TableCell align="right">S.BONUS</TableCell>
<TableCell align="right">P.BONUS</TableCell>
<TableCell align="right">SALARY CAP</TableCell>
<TableCell align="right">SALARY CAP PERCENTAGE</TableCell>
<TableCell align="right">PRED_AAV</TableCell>
{/* <TableCell align="right">PRED_SALARY_PERCENTAGE</TableCell> */}
<TableCell align="right">PRED/ACTUAL</TableCell>
<TableCell align="right">GP</TableCell>
<TableCell align="right">GOALS/GP</TableCell>
<TableCell align="right">TOTAL ASSISTS/GP</TableCell>
<TableCell align="right">FIRST ASSISTS/GP</TableCell>
<TableCell align="right">SECOND ASSISTS/GP</TableCell>
<TableCell align="right">TOTAL POINTS/GP</TableCell>
<TableCell align="right">SHOTS/GP</TableCell>
<TableCell align="right">IXG/GP</TableCell>
<TableCell align="right">ICF/GP</TableCell>
<TableCell align="right">IFF/GP</TableCell>
<TableCell align="right">ISCF/GP</TableCell>
<TableCell align="right">IHDCF/GP</TableCell>
<TableCell align="right">CF/GP</TableCell>
<TableCell align="right">CA/GP</TableCell>
<TableCell align="right">FF/GP</TableCell>
<TableCell align="right">FA/GP</TableCell>
<TableCell align="right">GF/GP</TableCell>
<TableCell align="right">GA/GP</TableCell>
<TableCell align="right">XGF/GP</TableCell>
<TableCell align="right">XGA/GP</TableCell>
<TableCell align="right">HDCF/GP</TableCell>
<TableCell align="right">HDCA/GP</TableCell>
<TableCell align="right">HDGF/GP</TableCell>
<TableCell align="right">HDGA/GP</TableCell>
<TableCell align="right">MDCF/GP</TableCell>
<TableCell align="right">MDCA/GP</TableCell>
<TableCell align="right">MDGF/GP</TableCell>
<TableCell align="right">MDGA/GP</TableCell>
<TableCell align="right">LDCF/GP</TableCell>
<TableCell align="right">LDCA/GP</TableCell>
<TableCell align="right">LDGF/GP</TableCell>
<TableCell align="right">LDGA/GP</TableCell>

                {/* 添加更多的列头 */}
              </TableRow>
            </TableHead>
            <TableBody>
              {playerData.map((yearData) => (
                <TableRow
                  key={yearData.year}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{yearData["year"]}</TableCell>
<TableCell align="right">{yearData.stats["TEAM"]}</TableCell>
{/* <TableCell align="right" style={{ fontSize: '32px' }}>
                      {countryFlags[yearData.stats["NATIONALITY"]] || '🇺🇳'}
                    </TableCell> */}
<TableCell align="right">{yearData.stats["AGE"]}</TableCell>
<TableCell align="right">{yearData.stats["POSITION"]}</TableCell>
<TableCell align="right">{yearData.stats["CAP HIT"]}</TableCell>
<TableCell align="right">{Number(yearData.stats["SALARY"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["S.BONUS"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["P.BONUS"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["salary_cap"]).toFixed(0)}</TableCell>
<TableCell align="right">{Number(yearData.stats["salary_cap_percetage"]).toFixed(2)}</TableCell>
<TableCell align="right">{convertToNumber(yearData.stats["PRED"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["PERCENTAGE"]).toFixed(2)}</TableCell>
{/* <TableCell align="right">{((convertToNumber(yearData.stats["PRED"]).toFixed(2))/(Number(yearData.stats["SALARY"]))).toFixed(2)}</TableCell> */}
<TableCell align="right">{Number(yearData.stats["GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["GOALS/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["TOTAL ASSISTS/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["FIRST ASSISTS/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["SECOND ASSISTS/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["TOTAL POINTS/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["SHOTS/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["IXG/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["ICF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["IFF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["ISCF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["IHDCF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["CF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["CA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["FF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["FA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["GF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["GA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["XGF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["XGA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["HDCF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["HDCA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["HDGF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["HDGA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["MDCF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["MDCA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["MDGF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["MDGA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["LDCF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["LDCA/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["LDGF/GP"]).toFixed(2)}</TableCell>
<TableCell align="right">{Number(yearData.stats["LDGA/GP"]).toFixed(2)}</TableCell>



                  
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
