import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';

const Map = ({ data, onRegionClick }) => {
  useEffect(() => {
    // Register world map data
    fetch('https://raw.githubusercontent.com/apache/echarts/master/src/map/json/world.json')
      .then(response => response.json())
      .then(worldJson => {
        echarts.registerMap('world', worldJson);
      });
  }, []);

  const option = {
    backgroundColor: '#f8fafc',
    title: {
      text: 'Global Console Market Share',
      subtext: 'Click regions to update data',
      left: 'center',
      top: '20px'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const regionData = data[params.name] || { 
          leader: 'Neutral', 
          share: { playstation: 50, xbox: 50 } 
        };
        return `
          <div class="font-bold">${params.name}</div>
          <div class="text-[#006FCD]">PlayStation: ${regionData.share.playstation}%</div>
          <div class="text-[#107C10]">Xbox: ${regionData.share.xbox}%</div>
          <div>Leader: ${regionData.leader}</div>
        `;
      }
    },
    visualMap: {
      left: 'right',
      min: -100,
      max: 100,
      text: ['PlayStation Dominant', 'Xbox Dominant'],
      inRange: {
        color: ['#107C10', '#4B5563', '#006FCD']
      },
      calculable: true,
      dimension: 0
    },
    series: [{
      name: 'Market Share',
      type: 'map',
      map: 'world',
      roam: true,
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
          fontWeight: 'bold'
        },
        itemStyle: {
          areaColor: '#ccc',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
        areaColor: '#f0f0f0'
      },
      data: Object.entries(data).map(([name, value]) => ({
        name,
        value: value.share.playstation - value.share.xbox,
        itemStyle: {
          areaColor: value.share.playstation > value.share.xbox 
            ? '#006FCD' 
            : value.share.xbox > value.share.playstation 
              ? '#107C10' 
              : '#4B5563'
        }
      }))
    }]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[700px] bg-white rounded-xl shadow-lg p-6"
    >
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        onEvents={{
          click: (params) => {
            if (params.name) {
              onRegionClick(params.name);
            }
          }
        }}
        opts={{ renderer: 'canvas' }}
      />
    </motion.div>
  );
};

export default Map;