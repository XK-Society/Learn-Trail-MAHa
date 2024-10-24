import React from 'react';
import { FaCog } from 'react-icons/fa'; // Import the settings icon

const ProfileNavbar = () => {
  return (
    <div className="flex w-full items-center justify-between p-4 bg-bgBar shadow-md">
      <h1 className="text-center flex-grow font-semibold">Profile</h1>
      <button>
        <FaCog size={20} />
      </button>
    </div>
  );
};

export default ProfileNavbar;
