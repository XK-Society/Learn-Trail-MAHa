import React from 'react';
import LTLogo from "../../assets/learn-trail/light-logo.png";
import NLogo from "../../assets/learn-trail/nouns-logo.png";

const LoadingScreen = () => {
  const generateRandomPositions = (num) => {
    const positions = [];
    for (let i = 0; i < num; i++) {
      const top = `${Math.floor(Math.random() * 95)}vh`;  
      const left = `${Math.floor(Math.random() * 27)}vw`; 
      positions.push({ top, left });
    }
    return positions;
  };

  const scatteredPositions = generateRandomPositions(35);

  return (
    <div className="container md:max-w-md mx-auto h-screen relative min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center relative z-10">
        <img
          src={LTLogo}
          alt="Learn Trail logo"
          className="w-44 h-44 sm:w-44 sm:h-44 mb-4 animate-bounce scale-up-center"
        />
        <h2 className="text-lg sm:text-xl font-semibold loading-dots">Loading</h2>
      </div>

      {scatteredPositions.map((position, index) => (
        <img
          key={index}
          src={NLogo}
          alt={`Nouns logo ${index}`}
          className="w-8 h-8 sm:w-12 sm:h-12 absolute animate-fade-in-out" 
          style={{ top: position.top, left: position.left }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;
