import React from 'react'
import ranks from '../../Data/RankListData'

const RankList = () => {
  return (
    <div className="p-4">
        <div className=" divide-y bg-bgBar bg-opacity-40 rounded-lg divide-gray-200 dark:divide-gray-700">
            {ranks.map((rank) => (
                <div key={rank.id} className="flex justify-between items-center space-x-4 rtl:space-x-reverse p-4">
                  <div className="flex justify-center items-center">
                    <h2 className="font-semibold">{rank.number}</h2>
                    <div className="px-4">
                      <img src={rank.profile} className="w-10 h-10 rounded-full" />
                    </div>
                  </div>
                    <h2 className="font-semibold">{rank.exp}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RankList;