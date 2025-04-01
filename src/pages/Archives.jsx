import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NewsStory from '../components/NewsStory';
import { FaArrowLeft } from 'react-icons/fa';

const Archives = ({ archivedStories }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        <motion.h1 
          className="text-4xl font-bold text-gray-800 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          News Archives
        </motion.h1>

        <div className="space-y-4">
          {archivedStories.map((story, index) => (
            <NewsStory key={index} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archives;