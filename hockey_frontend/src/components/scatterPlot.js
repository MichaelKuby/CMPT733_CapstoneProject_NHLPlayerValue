import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react'; // Updated import
import Nutrition from '../data/Nutrition.json'
// Import necessary ECharts components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  ScatterChart,
  CanvasRenderer,
]);

const NutrientChart = () => {
  const [option, setOption] = useState({});
  const [selectedXAxis, setSelectedXAxis] = useState('TOI');
  const [selectedYAxis, setSelectedYAxis] = useState('SALARY');
  const schema = [
    { name: 'name', index: 0 },
    { name: 'group', index: 1 },
    { name: 'GP', index: 2 },
    { name: 'TOI/GP', index: 3 },
    { name: 'TOI', index: 5 },
    { name: 'IPP', index: 6 },
    { name: 'GOALS', index: 7 },
    { name: 'TOTAL ASSISTS', index: 8 },
    { name: 'FIRST ASSISTS', index: 9 },
    { name: 'SECOND ASSISTS', index: 10 },
    { name: 'TOTAL POINTS', index: 11 },
    { name: 'SHOTS', index: 12 },
    { name: 'IXG', index: 13 },
    { name: 'ICF', index: 14 },
    { name: 'IFF', index: 15 },
    { name: 'SALARY', index: 16 },
  ];
  useEffect(() => {
    

    const fieldIndices = schema.reduce((obj, item) => {
      obj[item.name] = item.index;
      return obj;
    }, {});

    const groupCategories = [];
    const groupColors = [];

    function normalizeData(originData) {
      let groupMap = {};
      originData.forEach(row => {
        const groupName = row[fieldIndices.group];
        if (!groupMap.hasOwnProperty(groupName)) {
          groupMap[groupName] = 1;
          groupCategories.push(groupName);
        }
      });

      originData.forEach(row => {
        row.forEach((item, index) => {
          if (
            index !== fieldIndices.name &&
            index !== fieldIndices.group &&
            index !== fieldIndices.id
          ) {
            row[index] = parseFloat(item) || 0;
          }
        });
      });

      const hStep = Math.round(300 / (groupCategories.length - 1));
      for (let i = 0; i < groupCategories.length; i++) {
        groupColors.push(echarts.color.modifyHSL('#5A94DF', hStep * i));
      }

      return originData;
    }

    function getOption(data) {
      return {
        xAxis: {
          name: selectedXAxis,
          splitLine: { show: false },
        },
        yAxis: {
          name: selectedYAxis,
          splitLine: { show: false },
        },
        visualMap: [
          {
            show: false,
            type: 'piecewise',
            categories: groupCategories,
            dimension: 2,
            inRange: {
              color: groupColors,
            },
            outOfRange: {
              color: ['#ccc'],
            },
            top: 20,
            textStyle: {
              color: '#fff',
            },
            realtime: false,
          },
          {
            show: false,
            dimension: 3,
            max: 100,
            inRange: {
              colorLightness: [0.15, 0.6],
            },
          },
        ],
        series: [
          {
            zlevel: 1,
            name: 'nutrients',
            type: 'scatter',
            motionBlur: true,
            data: data.map(item => [
                item[fieldIndices[selectedXAxis]], // 使用selectedXAxis作为字段索引
                item[fieldIndices[selectedYAxis]], // 使用selectedYAxis作为字段索引
                item[fieldIndices['group']],
                item[fieldIndices['SALARY']],
            ]),
            
            animationThreshold: 5000,
            progressiveThreshold: 5000,
          },
        ],
        animationEasingUpdate: 'quadraticInOut',
        animationDurationUpdate: 1000,
      };
    }

        const originData = Nutrition
        const normalizedData = normalizeData(originData).slice(0, 100000);
        const updatedOption = getOption(normalizedData, selectedXAxis, selectedYAxis);
        setOption(updatedOption);
        // setOption(getOption(normalizedData));
      
  }, [selectedXAxis, selectedYAxis]);
  const handleXAxisChange = (event) => {
    setSelectedXAxis(event.target.value);
  };

  const handleYAxisChange = (event) => {
    setSelectedYAxis(event.target.value);
  };
  return (
    <div>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <select value={selectedXAxis} onChange={handleXAxisChange}>
          {schema.map((field) => (
            <option key={field.name} value={field.name}>
              {field.name}
            </option>
          ))}
        </select>
        <select value={selectedYAxis} onChange={handleYAxisChange}>
          {schema.map((field) => (
            <option key={field.name} value={field.name}>
              {field.name}
            </option>
          ))}
        </select>
      </div>
      <ReactECharts
  key={JSON.stringify(option)} // 这将强制在选项变化时重新渲染
  option={option}
  style={{ height: '600px', width: '100%' }}
/>

    </div>
  );
};

export default NutrientChart;


