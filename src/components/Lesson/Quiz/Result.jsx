const Result = ({ score, totalQuestion }) => {
    return (
      <div className='rounded-3xl flex items-center flex-col w-4/5 h-72 mt-36 bg-bgBox text-white'>
        <h2>Quiz Complete</h2>
        <p>Your score is {score} out of {totalQuestion}</p>
      </div>
    );
  }
  
  export default Result;
  