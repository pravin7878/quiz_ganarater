import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {
  const navigate = useNavigate();
  const { isLoding, isError, data } = useSelector((state) => state?.quizes);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

// console.log("ans", currentQuestion?.correct_answer)
// console.log("score",score)

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleResult = (clickedIndex) => {
  const selectedAnswer = answers[clickedIndex];
  const updatedSelectedAnswers = [...selectedAnswers];
  updatedSelectedAnswers[currentIndex] = clickedIndex;
  setSelectedAnswers(updatedSelectedAnswers);

  const isCorrect = currentQuestion?.correct_answer === selectedAnswer;

  const updatedScore = isCorrect ? score + 1 : score;
  setScore(updatedScore);

  // Last question — show result
  if (currentIndex === questions.length - 1) {
    setTimeout(() => {
      navigate('/leaderboard', {
        state: {
          userName: data?.userName,
          score: updatedScore, 
          totalScore: questions.length,
        },
      });
    }, 1000);
  }
};


  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]);
  }, [currentIndex, questions]);

  useEffect(() => {
    if (data?.results) {
      setQuestions(data.results);
      setCurrentQuestion(data.results[0]);
    }
  }, [data]);

  useEffect(() => {
    if (currentQuestion) {
      const { correct_answer, incorrect_answers } = currentQuestion;
      const allAnswers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
      setAnswers(allAnswers);
    }
  }, [currentQuestion]);

  if (isLoding) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-600">Error fetching quiz. Please refresh.</div>;

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-pink-600">{currentQuestion?.category}</h2>
          <span className="text-sm text-gray-600">{currentIndex + 1} / {questions.length}</span>
        </div>

        {/* Question */}
        <p className="text-lg font-semibold text-gray-800 mb-6">
          {currentIndex + 1}. {currentQuestion?.question}
        </p>

        {/* Answers */}
        <ul className="space-y-3 mb-6">
          {answers.map((answer, index) => {
            const isSelected = selectedAnswers[currentIndex] === index;
            const isCorrect = currentQuestion?.correct_answer === answer;

            let bgColor = 'bg-gray-100';
            if (isSelected) {
              bgColor = isCorrect ? 'bg-green-200' : 'bg-red-200';
            }

            return (
              <li key={index}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg  ${bgColor} hover:border hover:border-pink-400 transition duration-200`}
                  onClick={() => handleResult(index)}
                  disabled={selectedAnswers[currentIndex] !== undefined}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-5 py-2 rounded-md text-white transition duration-200 ${
              currentIndex === 0
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`px-5 py-2 rounded-md text-white transition duration-200 ${
              currentIndex === questions.length - 1
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
