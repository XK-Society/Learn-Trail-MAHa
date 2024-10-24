import React from 'react'
import { useNavigate } from 'react-router-dom'

const ModuleOne = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10">
        <div className="bg-bgBar rounded-md shadow-box w-4/5 max-w-md">
          <div className="text-center p-4">
            <h1 className="font-semibold">What is Web3?</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="p-4 text-center font-semibold">Imagine the internet you use every day - that's Web 2.0. Now, Web3 is like giving the internet superpowers! 🦸‍♂️</h2>
            <ul className="p-4">
              <li><p>⭐ It's all about putting you in control of your stuff online.</p></li>
              <li><p>⭐ No more big companies bossing your data around.</p></li>
              <li><p>⭐ It's like having your own piece of the internet!</p></li>
            </ul>
          </div>
        </div>
        <div className="p-10 space-x-32">
          <button onClick={() => handleClick('/courseone')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Back</button>
          <button onClick={() => handleClick('/quizone')} className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton">Next</button>
        </div>
    </div>
  )
}

export default ModuleOne;