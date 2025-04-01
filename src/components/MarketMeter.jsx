import React from 'react';
import { motion } from 'framer-motion';
import { FaPlaystation, FaXbox } from 'react-icons/fa';

const MarketMeter = ({ shareValue }) => {
  // shareValue: 0-100, where 50 is neutral, <50 favors PlayStation, >50 favors Xbox
  const position = `${shareValue}%`;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="relative h-20 mb-4">
        {/* Meter Background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gradient-to-r from-[#006FCD] to-[#006FCD]/70 rounded-l-lg" />
          <div className="w-1/2 bg-gradient-to-l from-[#107C10] to-[#107C10]/70 rounded-r-lg" />
        </div>
        
        {/* Marker */}
        <motion.div 
          className="absolute top-0 bottom-0 w-2 bg-white shadow-lg"
          style={{ left: position }}
          animate={{ left: position }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Icons */}
        <div className="absolute inset-0 flex justify-between items-center px-8">
          <FaPlaystation className="text-white text-4xl" />
          <FaXbox className="text-white text-4xl" />
        </div>
      </div>

      {/* Percentage Display */}
      <div className="flex justify-between text-lg font-bold">
        <span className="text-[#006FCD]">{100 - shareValue}%</span>
        <span className="text-[#107C10]">{shareValue}%</span>
      </div>
    </div>
  );
};

export default MarketMeter;