import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../../assets/learn-trail/profile/profile.png'

const UserProfile = () => {
    const username = "meowly";

    return (
      <div className="flex flex-col items-center pt-6">
        <div className="w-24 h-24 bg-bgBox rounded-full flex items-center justify-center">
          <img src={Logo} className="w-20 h-20"/>
        </div>
        <h1 className="mt-2 font-semibold">{username}</h1>
      </div>
  )
}

export default UserProfile