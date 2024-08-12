import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getQuestions, saveQuizResults } from '../services/quizService';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);
  const [firstFiveCompleted, setFirstFiveCompleted] = useState(false);
  const [questionResults, setQuestionResults] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchInitialQuestions = async () => {
      const fetchedQuestions = await getQuestions(5);
      setQuestions(fetchedQuestions);
    };
    fetchInitialQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded && !firstFiveCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !firstFiveCompleted) {
      handleAnswer(false);
    }
  }, [timeLeft, quizEnded, firstFiveCompleted]);

  const handleAnswer = (isCorrect) => {
    const timeTaken = 30 - timeLeft;
    setQuestionResults(prev => [...prev, {
      questionId: questions[currentQuestion].id,
      isCorrect,
      timeTaken
    }]);

    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else if (nextQuestion === 5) {
      setFirstFiveCompleted(true);
    } else {
      endQuiz();
    }
  };

  const fetchRemainingQuestions = async () => {
    const allQuestions = await getQuestions();
    const remainingQuestions = allQuestions.slice(5);
    setQuestions([...questions, ...remainingQuestions]);
    setFirstFiveCompleted(false);
    setCurrentQuestion(5);
    setTimeLeft(30);
  };

  const endQuiz = async () => {
    setQuizEnded(true);
    const results = {
      userId: currentUser.uid,
      score: score,
      totalQuestions: questions.length,
      questionResults: questionResults,
      timestamp: new Date()
    };
    await saveQuizResults(results);
  };

  if (questions.length === 0) return <div>Loading...</div>;
  if (quizEnded) return <div>Quiz ended! Your score: {score}/{questions.length}</div>;

  if (firstFiveCompleted) {
    return (
      <div>
        <ul>
        Bhai yeh yaad se fetch karke display kar dena sushrut ne bola hai <br/>
        Knowledge Level: <br/>
        Learning Rate:   <br/>
        Error Rate:      <br/>
        </ul>
        
      <div className="flex justify-center items-center h-screen">
        <button 
          onClick={fetchRemainingQuestions}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Next
        </button>
      </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-right mb-4">Time left: {timeLeft}s</div>
      <h2 className="text-2xl font-bold mb-4">{question.text}</h2>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.isCorrect)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;