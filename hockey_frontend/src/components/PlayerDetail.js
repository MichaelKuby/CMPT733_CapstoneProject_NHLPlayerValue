import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hockeyData from '../data/playersData.json';

const PlayerDetail = () => {
//   const { playerName } = useParams(); // 获取路由参数
    
  const [playerInfo, setPlayerInfo] = useState(null);
  const currentPath = window.location.pathname;

  // 提取最后一个斜杠后面的内容
  const lastIndex = currentPath.lastIndexOf('/');
  const playerName_unreplace = currentPath.substring(lastIndex + 1);

//   const playerName = playerName_unreplace.replace(/%20/g, ' ');
  const { playerName } = useParams();
  console.log(playerName)


  useEffect(() => {
    // 在 hockeyData 中查找匹配的球员信息
    const playerData = hockeyData.find(player => player.player == playerName);
    console.log(playerData)
    setPlayerInfo(playerData);
  }, [playerName]); // 当 playerName 改变时重新执行
  // 如果没有找到球员信息，显示加载中或找不到的消息
  if (!playerInfo) return <div>Player not found or loading...</div>;

  // 显示球员信息
//   return (
//     <div>
//       <h2>{playerInfo.player}</h2>
//       {/* 根据需要显示其他信息 */}
//       <p>Team: {playerInfo.Team}</p>
//     </div>
//   );
// };
return (
    <div>
      {/* Display player details here */}
      <h1>{playerInfo.player}</h1>
      <table>
        {/* Create table headers */}
        <thead>
          <tr>
            <th>{playerInfo.player}</th>
            <th>{playerInfo.player}</th>
            {/* More headers based on the data */}
          </tr>
        </thead>
        <tbody>
          {/* Map through the playerData to create table rows */}
          
            <tr>
              <td>{playerInfo.player}</td>
              <td>{playerInfo.player}</td>
              {/* More cells based on the data */}
            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default PlayerDetail;
