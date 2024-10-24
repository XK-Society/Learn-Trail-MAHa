import React from 'react';
import { useNavigate } from 'react-router-dom';

const courses = [
  { id: 1, title: '💫 Welcome to the World of Web3 and Base!', description: 'Hey there!👋 Ready to dive into something cool? Let\'s talk about Web3!',},
];


const CurrentCourses = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  }
  return (
    <div className="p-4 flex flex-col justify-center">
      <h1 className="mb-4 font-semibold ">Current Courses</h1>
      <div className="gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-bgBar bg-opacity-85 rounded-lg p-4 shadow-box">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className= "text-sm mb-4">{course.description}</p>
            <button onClick={()=>handleClick("/")} className="bg-bgButton text-white text-sm py-2 px-4 rounded hover:bg-white hover:text-bgButton">
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentCourses;
