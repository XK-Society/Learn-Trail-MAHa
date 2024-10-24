import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../WalletProvider';
import { useQuizContract } from '../Quiz/QuizContractProvider';
import Web3 from 'web3';

const quizContractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quizId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "_score",
        "type": "uint16"
      }
    ],
    "name": "completeQuiz",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_quizId",
        "type": "uint256"
      }
    ],
    "name": "getUserQuizAttempt",
    "outputs": [
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      },
      {
        "internalType": "uint16",
        "name": "score",
        "type": "uint16"
      },
      {
        "internalType": "uint32",
        "name": "lastAttemptTime",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "attemptedVersion",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const data = [
  {
    question: "What's the main goal of Web3?",
    options: [
      "To make the internet faster",
      "To give users more control over their online data and assets",
      "To create more social media platforms",
      "To increase online advertising"
    ],
    answer: "To give users more control over their online data and assets",
  }
];

const QuizOne = () => {
  const navigate = useNavigate();
  const { account, connectCoinbaseWallet, connectMetaMask } = useWallet();
  const { completeQuiz, getUserQuizAttempt } = useQuizContract();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [debugLog, setDebugLog] = useState('');

  useEffect(() => {
    const fetchQuizAttempt = async () => {
      if (account && getUserQuizAttempt) {
        try {
          const attempt = await getUserQuizAttempt(account, 1); // Assuming Quiz ID 1 for QuizOne
          setQuizAttempt(attempt);
        } catch (error) {
          console.error('Error fetching quiz attempt:', error);
        }
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
    if (selectedOption === data[currentQuestion].answer && account && completeQuiz) {
      try {
        await completeQuiz(1, 100); // Assuming Quiz ID 1 and perfect score for correct answer
        const updatedAttempt = await getUserQuizAttempt(account, 1);
        setQuizAttempt(updatedAttempt);
      } catch (error) {
        console.error('Error completing quiz:', error);
      }
    }
  };

  const appendToLog = (message) => {
    setDebugLog((prevLog) => prevLog + '\n' + message);
  };

  const debugContractCall = async () => {
    if (!account) {
      appendToLog('Wallet not connected');
      return;
    }

    appendToLog('Starting debug process...');

    try {
      const quizId = 1;
      const score = 100;
      appendToLog(`Preparing to call completeQuiz with quizId: ${quizId}, score: ${score}`);

      const provider = window.ethereum || window.coinbaseWalletProvider;
      if (!provider) {
        appendToLog('No provider found. Make sure your wallet is connected.');
        return;
      }

      const web3 = new Web3(provider);
      const contractAddress = '0x9F901376e91EC162B586059423afF5E0A2744FE2'; // Replace with your actual contract address
      const contract = new web3.eth.Contract(quizContractABI, contractAddress);

      appendToLog('Estimating gas...');
      let gasEstimate;
      try {
        gasEstimate = await contract.methods.completeQuiz(quizId, score).estimateGas({ from: account });
        appendToLog(`Gas estimate: ${gasEstimate}`);
      } catch (estimateError) {
        appendToLog(`Gas estimation failed: ${estimateError.message}`);
        if (estimateError.message.includes('revert')) {
          appendToLog(`Revert reason: ${estimateError.reason || 'Unknown'}`);
        }
      }

      appendToLog('Attempting to call the function (dry run)...');
      try {
        const result = await contract.methods.completeQuiz(quizId, score).call({ from: account });
        appendToLog(`Dry run successful. Result: ${JSON.stringify(result)}`);
      } catch (callError) {
        appendToLog(`Dry run failed: ${callError.message}`);
        if (callError.message.includes('revert')) {
          appendToLog(`Revert reason: ${callError.reason || 'Unknown'}`);
        }
      }

      if (gasEstimate) {
        appendToLog('Attempting to send the transaction...');
        const gasLimit = Math.floor(gasEstimate * 1.2);
        appendToLog(`Using gas limit: ${gasLimit}`);

        const result = await contract.methods.completeQuiz(quizId, score).send({ from: account, gas: gasLimit });
        appendToLog(`Transaction successful! Transaction hash: ${result.transactionHash}`);
      } else {
        appendToLog('Skipping transaction send due to failed gas estimation');
      }

    } catch (error) {
      appendToLog(`Unexpected error: ${error.message}`);
      console.error('Detailed error:', error);
    }
  };

  if (!account) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <button 
          onClick={() => setShowWalletOptions(!showWalletOptions)}
          className="bg-bgButton text-sm px-4 py-2 rounded hover:bg-white hover:text-bgButton"
        >
          Connect Wallet to Start Quiz
        </button>
        {showWalletOptions && (
          <div className="mt-2">
            <button 
              onClick={connectCoinbaseWallet}
              className="bg-bgButton text-sm px-4 py-2 rounded hover:bg-white hover:text-bgButton mr-2"
            >
              Coinbase Wallet
            </button>
            <button 
              onClick={connectMetaMask}
              className="bg-bgButton text-sm px-4 py-2 rounded hover:bg-white hover:text-bgButton"
            >
              MetaMask
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div className="bg-bgBar rounded-md shadow-box w-4/5 max-w-md">
        <div className="text-center p-4">
          <h1 className="font-semibold">Quiz 1</h1>
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
          onClick={() => handleClick('/moduleone')}
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
            onClick={() => handleClick('/moduletwo')}
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

      {/* Debug Section */}
      <div className="mt-8 p-4 border rounded w-4/5 max-w-md">
        <h3 className="text-lg font-bold mb-2">Debug Section</h3>
        <button 
          onClick={debugContractCall}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Run Debug
        </button>
        <pre className="mt-4 p-2 bg-bgBar rounded overflow-auto max-h-60 text-sm">
          {debugLog}
        </pre>
      </div>
    </div>
  );
};

export default QuizOne;