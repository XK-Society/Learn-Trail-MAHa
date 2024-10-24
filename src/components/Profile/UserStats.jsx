import React from 'react'
import RankLogo from '../../assets/learn-trail/rank.png'

const UserStats = () => {
  return (
    <div className="flex justify-around py-2 ">
        <div className="w-32 h-32 bg-bgBar bg-opacity-85 rounded-md flex flex-col items-center justify-center shadow-box">
            <img />
            <h2>0</h2>
            <p>Days Streak</p>
        </div>
        <div className="w-32 h-32 bg-bgBar bg-opacity-85 rounded-md flex flex-col items-center justify-center shadow-box">
            <img />
            <h2>100</h2>
            <p>XP</p>
        </div>
        <div className="w-32 h-32 bg-bgBar bg-opacity-85 rounded-md flex flex-col items-center justify-center shadow-box">
            <img src={RankLogo} className="w-20 h-20"/>
            <h2>Wood</h2>
            <p>League</p>
        </div>
    </div>
  )
}

export default UserStats