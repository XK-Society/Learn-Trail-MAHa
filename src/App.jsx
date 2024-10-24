// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import LoadingScreen from './components/Screen/LoadingScreen';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Learn from './pages/Learn';
import Leaderboard from './pages/Leaderboard';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import { WalletProvider } from './components/WalletProvider';
import { QuizContractProvider } from './components/Lesson/Quiz/QuizContractProvider'; // Import QuizContractProvider
import CourseListOne from './components/Course/CourseList/CourseListOne';
import CourseListTwo from './components/Course/CourseList/CourseListTwo';
import ModuleOne from './components/Lesson/Module/ModuleOne';
import ModuleTwo from './components/Lesson/Module/ModuleTwo';
import QuizOne from './components/Lesson/Quiz/QuizOne';
import QuizTwo from './components/Lesson/Quiz/QuizTwo';
import ModuleIDE from './components/Lesson/Module/ModuleIDE';
import ModuleDone from './components/Lesson/Module/ModuleDone';
import QuizTest from './components/Lesson/Quiz/QuizTest';
import Login from '../src/pages/Login'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Learn />
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />
        },
        {
          path: "/progress",
          element: <Progress />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/courseone",
          element: <CourseListOne />
        },
        {
          path: "/coursetwo",
          element: <CourseListTwo />
        },
        {
          path: "/moduleone",
          element: <ModuleOne />
        },
        {
          path: "/moduletwo",
          element: <ModuleTwo />
        },
        {
          path: "/quizone",
          element: <QuizOne />
        },
        {
          path: "/quiztwo",
          element: <QuizTwo />
        },
        {
          path: "/moduleide",
          element: <ModuleIDE />
        },
        {
          path: "/thanks",
          element: <ModuleDone />
        },
        {
          path: "/quiztest",
          element: <QuizTest />
        },
      ],
    },
  ]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <WalletProvider>
      <QuizContractProvider>
        <RouterProvider router={router} />
      </QuizContractProvider>
    </WalletProvider>
  );
}

export default App;