import React from 'react';
import QuizCard from './QuizCard';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const { currentUser } = useAuth();

    return (
        <div className="container">
            <div className="landing-page">
                {currentUser ? (
                    <QuizCard />
                ) : (
                    <div className="text-center">
                        <h1 className="landing-title">
                            Welcome to <span>The Quiz App!</span>
                        </h1>
                        <p className="landing-subtitle">
                            Discover amazing quizzes on our platform. Sign up now to get started!
                        </p>
                        <div className="mt-5 flex justify-center space-x-4">
                            <Link to="/signup" className="quiz-card-button">
                                Get started
                            </Link>
                            <Link to="/signin" className="quiz-card-button">
                                Sign In
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
