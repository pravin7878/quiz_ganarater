import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const QuizPage = () => {
    const { isLoding, isError, data } = useSelector((state) => state?.quizes);
    const [quations, setquations] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [curruntQuation, setcurruntQuation] = useState(null);
    const [answers, setanswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); 
    const [score, setScore] = useState(0); 

    const handleNext = () => {
        if (currentQuestionIndex < quations.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleResult = (clickedIndex) => {
        const selectedAnswer = answers[clickedIndex];

        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = clickedIndex;
        setSelectedAnswers(updatedSelectedAnswers);
        if (curruntQuation?.correct_answer === selectedAnswer && updatedSelectedAnswers[currentQuestionIndex] !== clickedIndex) {
            console.log("Correct Answer!");
            setScore(prevScore => prevScore + 1); 
        } else {
            console.log("Incorrect Answer.");
        }
    };

    useEffect(() => {
        setcurruntQuation(quations[currentQuestionIndex]);
    }, [currentQuestionIndex, quations]);

    useEffect(() => {
        if (data?.results) {
            setquations(data.results);
            setcurruntQuation(data.results[0]);
        }
    }, [data]);

    useEffect(() => {
        if (curruntQuation) {
            const { correct_answer, incorrect_answers } = curruntQuation;
            if (incorrect_answers) {
                const allAnswers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5); 
                setanswers(allAnswers);
            }
        }
    }, [curruntQuation]);

    if (isLoding) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching quizzes. Please refresh the page...</div>;
    }

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
            <div className='flex justify-between'>
                <h2 className="text-lg font-bold mb-4">{curruntQuation?.category}</h2>
                <p>{currentQuestionIndex + 1}/{quations.length}</p>
            </div>
            <p className="text-gray-700 mb-6">{currentQuestionIndex + 1}. {curruntQuation?.question}</p>

            <ul className="space-y-2 mb-6">
                {answers?.map((answer, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200">
                        <button
                            onClick={() => handleResult(index)}
                            className={`w-full text-left p-2
                            ${selectedAnswers[currentQuestionIndex] === index
                                    ? curruntQuation?.correct_answer === answer
                                        ? 'bg-green-200'  
                                        : 'bg-red-200'    
                                    : ''
                                }`}
                            disabled={selectedAnswers[currentQuestionIndex] !== undefined} 
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <button
                    onClick={handlePrev}
                    className={`px-4 py-2 rounded-md bg-blue-500 text-white ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentQuestionIndex === 0}
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    className={`px-4 py-2 rounded-md bg-blue-500 text-white ${currentQuestionIndex === quations.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentQuestionIndex === quations.length - 1}
                >
                    Next
                </button>
            </div>

            <div className="mt-4">
                <p>Your Score: {score}</p>
            </div>
        </div>
    );
};
