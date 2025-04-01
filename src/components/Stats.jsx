import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaPlaystation, FaXbox } from 'react-icons/fa';
import ReactECharts from 'echarts-for-react';

const Stats = ({ data }) => {
  const stats = useMemo(() => {
    let psTotal = 0;
    let xboxTotal = 0;
    let regions = 0;
    let psLeading = 0;
    let xboxLeading = 0;

    Object.values(data).forEach(region => {
      psTotal += region.share.playstation;
      xboxTotal += region.share.xbox;
      if (region.leader === 'PlayStation') psLeading++;
      if (region.leader === 'Xbox') xboxLeading++;
      regions++;
    });

    return {
      playstation: regions ? Math.round(psTotal / regions) : 0,
      xbox: regions ? Math.round(xboxTotal / regions) : 0,
      psLeadingRegions: psLeading,
      xboxLeadingRegions: xboxLeading
    };
  }, [data]);

  const chartOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Leading Regions',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: stats.psLeadingRegions, 
            name: 'PlayStation',
            itemStyle: { color: '#006FCD' }
          },
          { 
            value: stats.xboxLeadingRegions, 
            name: 'Xbox',
            itemStyle: { color: '#107C10' }
          }
        ]
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <FaPlaystation className="text-playstation text-4xl" />
            <div>
              <p className="text-sm text-gray-600">PlayStation</p>
              <p className="text-3xl font-bold">{stats.playstation}%</p>
              <p className="text-sm text-gray-500">
                Leading in {stats.psLeadingRegions} regions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <FaXbox className="text-xbox text-4xl" />
            <div>
              <p className="text-sm text-gray-600">Xbox</p>
              <p className="text-3xl font-bold">{stats.xbox}%</p>
              <p className="text-sm text-gray-500">
                Leading in {stats.xboxLeadingRegions} regions
              </p>
            </div>
          </div>
        </div>

        <div className="h-[200px]">
          <ReactECharts option={chartOption} style={{ height: '100%' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;