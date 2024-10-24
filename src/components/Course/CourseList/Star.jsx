import React from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ title, stars, handleClick }) => {
    return (
      <div className="px-2 pb-4 pt-1 bg-bgBar bg-opacity-25 shadow-box rounded-lg">
        <h1 className="pb-1 font-semibold">{title}</h1>
        <div className="flex justify-between px-4">
          {stars.map((star, index) => (
            <div key={index} className="w-14 h-14 bg-bgButton hover:bg-bgButton rounded-full shadow-circle flex items-center justify-center">
              <button 
                className={`${star.active ? 'text-yellow-400' : 'text-white'} flex items-center justify-center`}
                onClick={() => star.route && handleClick(star.route)}
              >
                <FaStar size={28} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Star;