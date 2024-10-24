import  { useEffect, useState } from "react";
import Result from "./Result";
import Question from "./Question";
const data = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    answer: "Berlin",
  },
  {
    question: "What is the capital of Spain?",
    options: ["Madrid", "Barcelona", "Seville", "Valencia"],
    answer: "Madrid",
  },
];

const QuizTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showNextButton, setShowNextButton] = useState(true);

//   useEffect(() => {
//     if (timer === 0) {
//       handleNext();
//     }
//     const timerId = setTimeout(() => setTimer(timer - 1), 1000);
//     return () => clearTimeout(timerId);
//   }, [timer]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === data[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowNextButton(true); // Show the next button after answering
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
    setShowNextButton(true); // Hide the next button after moving to the next question
    setTimer(30);
  };

  if (showResult) {
    return <Result score={score} totalQuestion={data.length} />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-40 bg-bgBar rounded-md shadow-box w-4/5 max-w-md h-96">

      <Question
        question={data[currentQuestion].question}
        options={data[currentQuestion].options}
        onAnswer={handleAnswer}
        onNext={handleNext}
        showNextButton={showNextButton}
      />
      
    </div>
    </div>
  );
};

export default QuizTest;