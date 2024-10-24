import React from 'react'
import Rank from '../../assets/learn-trail/rank.png'
import LockRank from '../../assets/learn-trail/lock-rank.png'

const RankBadge = () => {
  return (
    <div className="p-4">
      <div className="pt-1 bg-bgBar shadow-box bg-opacity-80 rounded-lg">
        <div className="flex justify-between">
          <img src={Rank} className="w-20 h-20"/>
          <img src={LockRank} className="w-20 h-20"/>
          <img src={LockRank} className="w-20 h-20"/>
          <img src={LockRank} className="w-20 h-20"/>
          <img src={LockRank} className="w-20 h-20"/>
        </div>
        <h2 className="pl-4 pb-2 font-semibold">Wooden League</h2>
      </div>
    </div>
  )
}

export default RankBadge