import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  const value = {
    currentUser,
    signIn,
    signUp,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}