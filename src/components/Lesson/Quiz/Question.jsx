const Question = ({ question, options, onAnswer, onCheck, showNextButton }) => {
    
  return (
      <div className="flex flex-col justify-center items-center">
        <h2>{question}</h2>
        {options.map((option, index) => (
          <div className="p-2">
          <button className="bg-white text-bg hover:bg-bgBox hover:text-white p-2 rounded-md" key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
          </div>
        ))}
        <div className="p-4">
        {showNextButton && <button className="bg-bgButton text-sm px-4 py-2 rounded hover:bg-white hover:text-bgButton" onClick={onCheck}>Check Answer</button>}
      </div>
      </div>
    );
  };
  
  export default Question;