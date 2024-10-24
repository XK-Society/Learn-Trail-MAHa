import React from 'react'
import { useNavigate } from 'react-router-dom';

const ModuleIntro = () => {
    const navigate = useNavigate();

    const handleClick = (route) => {
      navigate(route);
    }
  
    return (
      <div className="flex flex-col justify-center items-center pt-10">
          <div className="bg-bgBar rounded-md shadow-box w-4/5 max-w-md h-96">
            <div className="text-center p-4">
              <h1 className="font-semibold">What's This Web3 Thing All About?</h1>
            </div>
            <div className="flex justify-center items-center">
              <p>Hey there! 👋 Ready to dive into something cool? Let's talk about Web3!</p>
            </div>
          </div>
          <div className="p-10 space-x-32">
            <button onClick={() => handleClick('/courseone')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Back</button>
            <button onClick={() => handleClick('/moduleone')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Next</button>
          </div>
      </div>
    )
  }

export default ModuleIntro
