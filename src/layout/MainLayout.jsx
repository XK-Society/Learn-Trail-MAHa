import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TabNav from '../components/TabNav';
import HomeNavbar from '../components/NavBar/HomeNavBar';
import CourseNavbar from '../components/NavBar/CourseNavBar';
import ProfileNavbar from '../components/NavBar/ProfileNavBar';
import LessonNavbar from '../components/NavBar/LessonNavBar';
import CourseListOne from '../components/Course/CourseList/CourseListOne';
import CourseListTwo from '../components/Course/CourseList/CourseListTwo';
import CourseDropdown from '../components/Course/CourseDropdown';

const MainLayout = () => {
    const location = useLocation();
 

    let headerBar;
    switch (location.pathname) {
        case '/profile':
            headerBar = <ProfileNavbar />;
            break;
        case '/lesson4':
            headerBar = <LessonNavbar />;
            break;
        default:
            headerBar = <HomeNavbar />;
    }

    return (
        <div className="container md:max-w-md mx-auto h-screen flex flex-col bg-[url('../src/assets/learn-trail/bg.gif')] bg-no-repeat bg-cover">

            <header className="flex-shrink-0">
                {headerBar}
            </header>

            <main className="flex-grow overflow-y-auto ">
                <Outlet />
            </main>

            <footer className="flex-shrink-0">
              <div className="md:max-w-md mx-auto">
                  <TabNav />
              </div>
            </footer>
        </div>
    );
};

export default MainLayout;
