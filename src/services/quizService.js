import { db } from '../firebase';
import { collection, getDocs, addDoc, query, limit } from 'firebase/firestore';

export const getQuestions = async (count = null) => {
  const questionsRef = collection(db, 'questions');
  let q = questionsRef;
  
  if (count) {
    q = query(questionsRef, limit(count));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const saveQuizResults = async (results) => {
  const resultsRef = collection(db, 'quizResults');
  await addDoc(resultsRef, results);
};