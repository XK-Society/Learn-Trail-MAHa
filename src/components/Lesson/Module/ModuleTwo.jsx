import React from 'react'
import { useNavigate } from 'react-router-dom';

const ModuleTwo = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10">
        <div className="bg-bgBar rounded-md shadow-box w-4/5 max-w-md">
          <div className="text-center p-4">
            <h1 className="font-semibold">Why Should You Care?</h1>
          </div>
          <div className="flex justify-center items-center">
          <ul className="p-4">
              <li><p>⭐ Ever felt like your data isn't really yours? Web3 fixes that!</p></li>
              <li><p>⭐ Want to make money from your creativity? Web3 makes it easier!</p></li>
              <li><p>⭐ Love gaming? Web3 lets you truly own your in-game items!</p></li>
            </ul>
          </div>
        </div>
        <div className="p-10 space-x-32">
          <button onClick={() => handleClick('/moduleone')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Back</button>
          <button onClick={() => handleClick('/quiztwo')}  className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Next</button>
        </div>
    </div>
  )
}

export default ModuleTwo;