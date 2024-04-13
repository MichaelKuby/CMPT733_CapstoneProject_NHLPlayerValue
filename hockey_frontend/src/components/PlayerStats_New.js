// 工资折线图


import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import playerData from '../data/player_all_salary.json';
import { useParams } from 'react-router-dom';

const MyChartComponent = () => {
  const { playerName } = useParams();    // 假设URL是 /player/:playerName
  useEffect(() => {
    console.log(playerName); // 这应该打印出URL中的playerName
    // 基于playerName做一些事情
  }, [playerName]);
  function convertToNumber(str) {
    // 去除字符串中的逗号
    const stringWithoutCommas = str.replace(/,/g, '');
    // 将结果转换为数字
    const number = Number(stringWithoutCommas);
    // 返回转换后的数字
    return number;
  }

  function convertToNumber2(str) {
    // 去除字符串中的逗号
    // const stringWithoutCommas = str.replace(/,/g, '');
    // 将结果转换为数字
    const number = Number(str);
    // 返回转换后的数字
    return number;
  }
  const chartRef = useRef(null);
  const run = () => {
    const selectedPlayerData = playerData.players.filter(player => player.name == playerName);

    if (selectedPlayerData.length > 0) {
      const player = selectedPlayerData[0]; // Assuming only one player matches
      const seriesData = [
        
        {
          name: 'Actual Cap Hit',
          type: 'line',
          data: player.years.map(year => [year.year, Number(year.stats.salary_cap_percetage)*Number(year.stats.salary_cap)]),
          showSymbol: true,
        },
        {
          name: 'Predicted Cap Hit',
          type: 'line',
          data: player.years.map(year => [year.year, convertToNumber(year.stats.PRED)]),
          showSymbol: true,
        },
      ];

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: 'Year'
        },
        yAxis: {
          type: 'value',
          name: 'Cap Hit'
        },
        series: seriesData
      };

      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
  };

  useEffect(() => {
    if(playerName) {
      run(playerName);
    }
    
    return () => {
      const myChart = echarts.init(chartRef.current);
      myChart.dispose();
    };
  }, [playerName]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default MyChartComponent;
