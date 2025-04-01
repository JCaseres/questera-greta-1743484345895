import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import MarketMeter from './components/MarketMeter';
import NewsStory from './components/NewsStory';
import Archives from './pages/Archives';
import { FaArchive } from 'react-icons/fa';

const initialStories = [
  {
    company: 'Sony',
    date: 'March 25, 2025',
    title: 'Sony Layoffs once again',
    description: 'PlayStation has once again laid off 500 employees.',
    isPositive: false,
    url: 'https://blog.playstation.com/2023/11/25/spiderman-2-sales-record'
  },
  {
    company: 'Microsoft',
    date: 'Nov 25, 2025',
    title: 'Xbox releases first official Xbox Handheld',
    description: 'Xbox has released its first official Xbox handheld complete with Windows big picture mode.',
    isPositive: true,
    url: 'https://news.xbox.com/en-us/2025/11/25/xbox-handheld-announcement'
  },
  {
    company: 'Microsoft',
    date: 'Dec 15, 2023',
    title: 'Xbox Game Pass Reaches 30 Million Subscribers',
    description: 'Microsoft announces major milestone in subscription service growth.',
    isPositive: true,
    url: 'https://news.xbox.com/en-us/2023/12/15/game-pass-reaches-new-milestone'
  },
  {
    company: 'Sony',
    date: 'Dec 10, 2023',
    title: 'PS5 Sales Surpass 50 Million Units',
    description: 'PlayStation 5 hits new sales milestone ahead of holiday season.',
    isPositive: true,
    url: 'https://blog.playstation.com/2023/12/10/ps5-sales-milestone'
  },
  {
    company: 'Microsoft',
    date: 'Dec 5, 2023',
    title: 'Activision Games Join Game Pass',
    description: 'Call of Duty and other major titles now available on Game Pass.',
    isPositive: true,
    url: 'https://news.xbox.com/en-us/2023/12/05/activision-games-on-game-pass'
  }
];

const archivedStories = [
  {
    company: 'Sony',
    date: 'Nov 30, 2023',
    title: 'PlayStation Plus Revamp Success',
    description: 'New tier system shows strong adoption among players.',
    isPositive: true,
    url: 'https://blog.playstation.com/2023/11/30/playstation-plus-revamp'
  },
  {
    company: 'Sony',
    date: 'Nov 25, 2023',
    title: 'Spider-Man 2 Breaks Sales Records',
    description: 'Latest PlayStation exclusive becomes fastest-selling first-party game.',
    isPositive: true,
    url: 'https://blog.playstation.com/2023/11/25/spiderman-2-sales-record'
  },
  {
    company: 'Microsoft',
    date: 'Nov 20, 2023',
    title: 'Xbox Cloud Gaming Expands to New Markets',
    description: 'Cloud gaming service now available in 15 additional countries.',
    isPositive: true,
    url: 'https://news.xbox.com/en-us/2023/11/20/cloud-gaming-expansion'
  }
];

const Dashboard = ({ marketShare, stories }) => (
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
          <NewsStory key={index} story={story} />
        ))}
      </div>

      <Link 
        to="/archives" 
        className="mt-8 flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <FaArchive className="text-gray-600" />
        <span className="text-gray-600 font-medium">View Archives</span>
      </Link>
    </div>
  </div>
);

const App = () => {
  const [marketShare, setMarketShare] = useState(51); // Adjusted for the new negative Sony story
  const [stories, setStories] = useState(initialStories);
  const [archived, setArchived] = useState(archivedStories);

  const addNewsStory = (story) => {
    const impact = story.isPositive ? 1 : -1;
    const direction = story.company === 'Microsoft' ? impact : -impact;
    
    setMarketShare(prev => {
      const newShare = Math.min(Math.max(prev + direction, 0), 100);
      return newShare;
    });
    
    if (stories.length >= 5) {
      const oldestStory = stories[stories.length - 1];
      setArchived(prev => [oldestStory, ...prev]);
    }
    
    setStories(prev => [story, ...prev].slice(0, 5));
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard marketShare={marketShare} stories={stories} />} />
      <Route path="/archives" element={<Archives archivedStories={archived} />} />
    </Routes>
  );
};

export default App;