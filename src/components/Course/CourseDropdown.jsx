import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDropdown = () => {
  const [selectedModule, setSelectedModule] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selectedCourse = e.target.value;
    setSelectedModule(selectedCourse);

    // Navigate to the appropriate page immediately after selection
    if (selectedCourse === 'courseone') {
      navigate('/courseone');
    } else if (selectedCourse === 'coursetwo') {
      navigate('/coursetwo');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <select
        id="moduleSelect"
        className="border border-gray-300 p-1 rounded-lg text-gray-700 w-60 mb-4"
        value={selectedModule}
        onChange={handleChange}
      >
        <option value="courseone">Web3 and Base</option>
        <option value="coursetwo">Creating Cool Stuff on Web3</option>
      </select>
    </div>
  );
};

export default CourseDropdown;
