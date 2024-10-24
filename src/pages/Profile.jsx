import React from 'react'
import UserProfile from '../components/Profile/UserProfile'
import CourseBadge from '../components/Course/CourseBadgeList'
import CourseBadgePage from '../components/Course/CourseBadge'
import UserStats from '../components/Profile/UserStats'

const Profile = () => {
  return (
    <div>
      <UserProfile />
      <UserStats />
      <CourseBadgePage />
    </div>
  )
}

export default Profile