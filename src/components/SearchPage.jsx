import React, { useState } from 'react';
import dummyCourses from "../Data/CoursesData";
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = dummyCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex mb-3 items-center bg-bgBar bg-opacity-75 border-bgBar shadow-box p-2 rounded-lg">
        <FaSearch size={20} />
        <input
          type="text"
          placeholder="Search for courses..."
          className="ml-2 flex-grow outline-none p-2 rounded bg-bgBar bg-opacity-65 border-bgBar placeholder:text-white placeholder:text-opacity-40"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm ? (
        <div className=" bg-bgBar bg-opacity-75 border-bgBar shadow-box rounded-lg p-4">
          <h1 className="mb-2 font-semibold">Courses</h1>
          {filteredCourses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            <ul>
              {filteredCourses.map(course => (
                <li key={course.id} className="py-2 border-b last:border-b-0">
                  {course.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ): ""}
    </div>
  );
};

export default SearchPage;
