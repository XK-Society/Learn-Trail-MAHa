import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiBooksDuotone, PiChartBarDuotone, PiTrophyDuotone, PiUserCircleDashedDuotone } from 'react-icons/pi';

const TabNav = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate(); 

  const handleTabClick = (tab, route) => {
    setActiveTab(tab);
    navigate(route);
  };

  return (
    <div className="w-full bg-bgBar z-50 rounded-t-xl ">
      <div className="flex justify-around">

        <button
          onClick={() => handleTabClick('learn', '/')}
          className={`p-2 w-full flex flex-col items-center ${
            activeTab === 'learn' ? 'text-bg' : 'text-bg text-opacity-35'
          }`}
        >
          <PiBooksDuotone size={28} />
          <p>Learn</p>
        </button>

        <button
          onClick={() => handleTabClick('leaderboard', '/leaderboard')}
          className={`p-2 w-full flex flex-col items-center ${
            activeTab === 'leaderboard' ? 'text-bg' : 'text-bg text-opacity-35'
          }`}
        >
          <PiTrophyDuotone size={28} />
          <p>Leaderboard</p>
        </button>

        <button
          onClick={() => handleTabClick('progress', '/progress')}
          className={`p-2 w-full flex flex-col items-center ${
            activeTab === 'progress' ? 'text-bg' : 'text-bg text-opacity-35'
          }`}
        >
          <PiChartBarDuotone size={28} />
          <p>Progress</p>
        </button>

        <button
          onClick={() => handleTabClick('profile', '/profile')}
          className={`p-2 w-full flex flex-col items-center ${
            activeTab === 'profile' ? 'text-bg' : 'text-bg text-opacity-35'
          }`}
        >
          <PiUserCircleDashedDuotone size={28} />
          <p>Profile</p>
        </button>
      </div>
    </div>
  );
};

export default TabNav;
