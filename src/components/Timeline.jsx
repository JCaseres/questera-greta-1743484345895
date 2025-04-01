import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaPlaystation, FaXbox } from 'react-icons/fa';

const TimelineEvent = ({ event, index }) => {
  const isPlayStation = event.company === 'Sony';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isPlayStation ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex items-start gap-4 ${isPlayStation ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`w-1/2 ${!isPlayStation && 'text-right'}`}>
        <div className={`inline-flex items-center gap-2 ${
          isPlayStation ? 'text-playstation' : 'text-xbox'
        }`}>
          {isPlayStation ? <FaPlaystation /> : <FaXbox />}
          <span className="font-semibold">{event.company}</span>
        </div>
        <p className="text-sm text-gray-500">
          {format(new Date(event.date), 'MMM d, yyyy')}
        </p>
        <h3 className="font-bold mt-1">{event.title}</h3>
        <p className="text-gray-600 mt-1">{event.description}</p>
        {event.impact && (
          <div className="mt-2 inline-block px-3 py-1 rounded-full text-sm bg-gray-100">
            Impact: {event.impact}
          </div>
        )}
      </div>
      
      <div className="relative flex items-center justify-center w-10">
        <div className="h-full w-0.5 bg-gray-200 absolute"></div>
        <div className={`w-4 h-4 rounded-full z-10 ${
          isPlayStation ? 'bg-playstation' : 'bg-xbox'
        }`}></div>
      </div>
      
      <div className="w-1/2"></div>
    </motion.div>
  );
};

const Timeline = ({ events }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Console Market Moves Timeline</h2>
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Timeline;