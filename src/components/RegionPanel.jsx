import React from 'react';
import { motion } from 'framer-motion';
import { FaPlaystation, FaXbox, FaTrophy } from 'react-icons/fa';

const RegionPanel = ({ region, data, onUpdateShare }) => {
  if (!region) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 text-center"
      >
        <div className="text-gray-500">
          <p className="text-lg">Select a region on the map</p>
          <p className="text-sm mt-2">Click any country to view and update market share data</p>
        </div>
      </motion.div>
    );
  }

  const regionData = data[region] || { 
    leader: 'Neutral',
    share: { playstation: 50, xbox: 50 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
        {region}
        <FaTrophy className={`text-2xl ${
          regionData.leader === 'PlayStation' ? 'text-playstation' :
          regionData.leader === 'Xbox' ? 'text-xbox' : 'text-gray-400'
        }`} />
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaPlaystation className="text-playstation text-2xl" />
              <span>PlayStation</span>
            </div>
            <span className="font-bold">{regionData.share.playstation}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={regionData.share.playstation}
            onChange={(e) => onUpdateShare(region, 'playstation', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-playstation"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaXbox className="text-xbox text-2xl" />
              <span>Xbox</span>
            </div>
            <span className="font-bold">{regionData.share.xbox}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={regionData.share.xbox}
            onChange={(e) => onUpdateShare(region, 'xbox', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-xbox"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700">Market Leader</h3>
          <p className={`text-xl font-bold ${
            regionData.leader === 'PlayStation' ? 'text-playstation' :
            regionData.leader === 'Xbox' ? 'text-xbox' : 'text-gray-500'
          }`}>
            {regionData.leader}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegionPanel;