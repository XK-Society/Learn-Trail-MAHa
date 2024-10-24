// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Badge from '../../assets/learn-trail/badge-done.png'
// import ModuleOne from '../Lesson/Module/ModuleOne'
// import QuizOne from './Quiz/QuizOne';

// const Lesson4 = () => {
  // const slides = [
  //   {
  //     id: 1,
  //     type: 'slide',
  //     lesson: 'Lesson 1',
  //     title: 'Introduction to Solana’s Architecture',
  //     description:
  //       'Overview of blockchain architecture Key differences between Solana and other blockchains.',
  //     imageSrc: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035',
  //   },
  //   {
  //     id: 2,
  //     type: 'slide',
  //     lesson: 'Introduction to Solana’s Architecture',
  //     title: 'Lesson Description',
  //     description:
  //       "This lesson introduces the basics of Solana's architecture, highlighting what sets it apart from other blockchains. We'll cover its consensus mechanisms, node roles, and transaction processing, explaining how Solana achieves high performance and scalability.",
  //     imageSrc: '',
  //   },
  //   {
  //     id: 3,
  //     type: 'slide',
  //     lesson: 'Introduction to Solana’s Architecture',
  //     title: 'Learning Objectives',
  //     description:
  //       'Learn blockchain basics, discover what makes Solana unique, and understand its key components and high-level operations.',
  //     imageSrc: '',
  //   },
  //   {
  //     id: 4,
  //     type: 'quiz',
  //     lesson: 'Quiz: Solana Architecture',
  //     title: 'What is one key feature of Solana?',
  //     question: 'Which of the following is a key feature of Solana?',
  //     options: ['High transaction fees', 'Low transaction costs', 'Slow processing'],
  //     correctAnswer: 1,
  //   },
  // ];

  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  // const [showRewardPopup, setShowRewardPopup] = useState(false);
  // const navigate = useNavigate();

  // const handleNextClick = () => {
  //   if (slides[currentSlide].type === 'quiz' && selectedOption === null) return; // Ensure user selects an option for quiz
  //   if (slides[currentSlide].type === 'quiz' && selectedOption === slides[currentSlide].correctAnswer) {
  //     setIsQuizCompleted(true);
  //   }

  //   setSelectedOption(null); // Reset selected option for the next quiz
  //   setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  // };

  // const handleFinishQuiz = () => {
  //   setShowRewardPopup(true);
  // };

  // const handleClosePopup = (route) => {
  //   setShowRewardPopup(false);
  //   navigate(route);
  // };

  // return (
  //   <div>
  //     <QuizOne />
  //   </div>
    // <div className="flex justify-center items-center pt-24">
    //   <div className="bg-bgBar p-6 rounded-md shadow-lg w-4/5 max-w-md text-center h-96 flex flex-col justify-center items-center space-y-4">

    //     {/* Conditionally render Slide or Quiz */}
    //     {slides[currentSlide].type === 'slide' && (
    //       <>
    //         {/* Image */}
    //         {slides[currentSlide].imageSrc && (
    //           <img
    //             src={slides[currentSlide].imageSrc}
    //             alt={slides[currentSlide].title}
    //             className="w-28 h-28 object-cover rounded-md"
    //           />
    //         )}
    //         {/* Lesson */}
    //         <h1>{slides[currentSlide].lesson}</h1>
    //         {/* Title */}
    //         <h2>{slides[currentSlide].title}</h2>
    //         {/* Description */}
    //         <p>{slides[currentSlide].description}</p>
    //       </>
    //     )}

    //     {/* Quiz Section */}
    //     {slides[currentSlide].type === 'quiz' && (
    //       <>
    //         <h2>{slides[currentSlide].lesson}</h2>
    //         <h1>{slides[currentSlide].title}</h1>
    //         <p>{slides[currentSlide].question}</p>
    //         <div className="flex flex-col space-y-2">
    //           {slides[currentSlide].options.map((option, index) => (
    //             <button
    //               key={index}
    //               className={`px-4 py-2 rounded-md ${selectedOption === index ? 'bg-bgButton text-white' : 'bg-white text-bgButton'}`}
    //               onClick={() => setSelectedOption(index)}
    //             >
    //               {option}
    //             </button>
    //           ))}
    //         </div>
    //         {isQuizCompleted && (
    //           <p className="text-green-500 font-bold">Correct Answer!</p>
    //         )}
    //       </>
    //     )}

    //     {/* Next Button or Finish Quiz */}
    //     {currentSlide === slides.length - 1 ? (
    //       <button
    //         onClick={handleFinishQuiz}
    //         className="bg-bgButton text-white px-4 py-2 rounded-md hover:bg-white hover:text-bgButton"
    //       >
    //         Finish Quiz
    //       </button>
    //     ) : (
    //       <button
    //         onClick={handleNextClick}
    //         className="bg-bgButton text-white px-4 py-2 rounded-md hover:bg-white hover:text-bgButton"
    //       >
    //         Next
    //       </button>
    //     )}

    //     {/* Reward Popup */}
    //     {showRewardPopup && (
    //       <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    //         <div className="bg-bg p-6 rounded-lg text-center shadow-lg space-y-4">
    //           <h2>Congratulations!</h2>
    //           <p>You have completed the quiz and earned a reward!</p>
    //           <div className="flex justify-center items-center"> 
    //           <img src={Badge} className="w-16 h-16"/>
    //           </div> 
    //           <button
    //             onClick={() => handleClosePopup('/course')}
    //             className="bg-bgButton text-white px-4 py-2 rounded-md hover:bg-white hover:text-bgButton"
    //           >
    //             Close
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
//   );
// };

// export default Lesson4;