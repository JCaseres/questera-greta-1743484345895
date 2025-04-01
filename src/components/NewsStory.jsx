import React from 'react';
import { motion } from 'framer-motion';
import { FaPlaystation, FaXbox, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const NewsStory = ({ story }) => {
  const icon = story.company === 'Sony' ? 
    <FaPlaystation className="text-[#006FCD] text-2xl" /> : 
    <FaXbox className="text-[#107C10] text-2xl" />;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow p-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="font-bold text-gray-600">{story.company}</span>
        <span className="text-sm text-gray-500">{story.date}</span>
        {story.isPositive ? 
          <FaThumbsUp className="text-green-500" /> : 
          <FaThumbsDown className="text-red-500" />
        }
      </div>
      <h3 className="font-bold mb-2">{story.title}</h3>
      <p className="text-gray-600 text-sm">{story.description}</p>
    </motion.div>
  );
};

export default NewsStory;