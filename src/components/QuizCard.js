import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = () => {
    return (
        <div className="quiz-card">
            <h2 className="quiz-card-title">Ready for a Challenge?</h2>
            <p className="quiz-card-content">Test your knowledge with our quick quiz!</p>
            <Link to="/quiz" className="quiz-card-button">
                Take a Quiz
            </Link>
        </div>
    );
};

export default QuizCard;
