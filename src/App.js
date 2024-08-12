import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import QuizPage from './components/QuizPage';
import './styles.css'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;