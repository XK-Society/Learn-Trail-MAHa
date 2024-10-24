import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../WalletProvider';
import { useQuizContract } from '../Quiz/QuizContractProvider';

const data = [
  {
    question: "What problem does Base (as a Layer 2 solution) help solve?",
    options: ["It makes websites look prettier", "It helps with slow and expensive transactions on Ethereum", "It creates new cryptocurrencies", "It replaces traditional banking"],
    answer: "It helps with slow and expensive transactions on Ethereum",
  }
];

const QuizTwo = () => {
  const navigate = useNavigate();
  const { account, connectWallet } = useWallet();
  const { completeQuiz, getUserQuizAttempt } = useQuizContract();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(null);

  useEffect(() => {
    const fetchQuizAttempt = async () => {
      if (account) {
        const attempt = await getUserQuizAttempt(2); // Assuming Quiz ID 2 for QuizTwo
        setQuizAttempt(attempt);
      }
    };
    fetchQuizAttempt();
  }, [account, getUserQuizAttempt]);

  const handleClick = (route) => {
    navigate(route);
  };

  const handleAnswer = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption === data[currentQuestion].answer) {
      setShowNextButton(true);
    }
  };

  const handleCheck = async () => {
    setShowResult(true);
    setShowNextButton(true);
    if (selectedOption === data[currentQuestion].answer && account) {
      try {
        await completeQuiz(2, 100); // Assuming Quiz ID 2 and perfect score for correct answer
        const updatedAttempt = await getUserQuizAttempt(2);
        setQuizAttempt(updatedAttempt);
      } catch (error) {
        console.error('Error completing quiz:', error);
      }
    }
  };

  if (!account) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <button onClick={connectWallet} className="bg-bgButton text-sm px-4 py-2 rounded hover:bg-white hover:text-bgButton">
          Connect Wallet to Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div className="bg-bgBar rounded-md shadow-box w-4/5 max-w-md">
        <div className="text-center p-4">
          <h1 className="font-semibold">Quiz 2</h1>
        </div>
        <div className="text-center">
          <h2 className="font-semibold">{data[currentQuestion].question}</h2>
        </div>
        <div className="flex flex-col px-4 py-2">
          {data[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`border p-2 my-2 rounded-lg ${selectedOption === option ? 'bg-bg' : 'bg-white text-bg'}`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
          {showResult && (
            <div className={`mt-4 ${selectedOption === data[currentQuestion].answer ? 'text-green-500' : 'text-red-500'}`}>
              {selectedOption === data[currentQuestion].answer
                ? 'Correct!'
                : `Incorrect! The correct answer is: ${data[currentQuestion].answer}`}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={() => handleClick('/moduletwo')}
          className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton"
        >
          Back
        </button>
        <button
          onClick={handleCheck}
          className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton"
        >
          Check Answer
        </button>
        {showNextButton && (
          <button
            onClick={() => handleClick('/moduleide')}
            className="bg-bgButton text-sm ml-2 px-4 py-2 rounded hover:bg-white hover:text-bgButton"
          >
            Next
          </button>
        )}
      </div>

      {quizAttempt && (
        <div className="mt-4 text-center">
          <p>Last Attempt Score: {quizAttempt.score}</p>
          <p>Completed: {quizAttempt.completed ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default QuizTwo;