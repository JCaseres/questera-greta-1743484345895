import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MarketMeter from './components/MarketMeter';
import NewsStory from './components/NewsStory';

const initialStories = [
  {
    company: 'Microsoft',
    date: 'Dec 15, 2023',
    title: 'Xbox Game Pass Reaches 30 Million Subscribers',
    description: 'Microsoft announces major milestone in subscription service growth.',
    isPositive: true
  },
  {
    company: 'Sony',
    date: 'Dec 10, 2023',
    title: 'PS5 Sales Surpass 50 Million Units',
    description: 'PlayStation 5 hits new sales milestone ahead of holiday season.',
    isPositive: true
  },
  {
    company: 'Microsoft',
    date: 'Dec 5, 2023',
    title: 'Activision Games Join Game Pass',
    description: 'Call of Duty and other major titles now available on Game Pass.',
    isPositive: true
  },
  {
    company: 'Sony',
    date: 'Nov 30, 2023',
    title: 'PlayStation Plus Revamp Success',
    description: 'New tier system shows strong adoption among players.',
    isPositive: true
  },
  {
    company: 'Sony',
    date: 'Nov 25, 2023',
    title: 'Spider-Man 2 Breaks Sales Records',
    description: 'Latest PlayStation exclusive becomes fastest-selling first-party game.',
    isPositive: true
  }
];

const App = () => {
  const [marketShare, setMarketShare] = useState(50); // 50% is neutral
  const [stories, setStories] = useState(initialStories);

  const addNewsStory = (story) => {
    const impact = story.isPositive ? 1 : -1;
    const direction = story.company === 'Microsoft' ? impact : -impact;
    
    setMarketShare(prev => {
      const newShare = Math.min(Math.max(prev + direction, 0), 100);
      return newShare;
    });
    
    setStories(prev => [story, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gray-800 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Console Market Share Tracker
        </motion.h1>

        <MarketMeter shareValue={marketShare} />

        <div className="space-y-4">
          {stories.map((story, index) => (
            <NewsStory 
              key={index}
              story={story}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;