import React from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '../CourseList/Star';
import CourseDropdown from '../CourseDropdown';

const CourseListOne = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="relative w-full max-w-md">
        <div className="absolute w-full h-full flex flex-col justify-between space-y-6">
          <Star 
            title="🤔 What's This Web3 Thing All About?" 
            stars={[
              { active: true, route: '/moduleone'},
              { active: false },
              { active: false }
            ]}
            handleClick={handleClick}
          />
          
          <Star 
            title="⚙️ Getting Started - Your Web3 Toolbox" 
            stars={[
              { active: false },
              { active: false },
              { active: false }
            ]}
            handleClick={handleClick}
          />

        </div>
      </div>
    </div>
  );
};

export default CourseListOne;
