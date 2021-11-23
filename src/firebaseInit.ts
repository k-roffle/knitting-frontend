import { initializeApp, FirebaseApp } from 'firebase/app';
import { getConfig } from 'utils/config';

const firebaseConfig: Record<string, unknown> = {
  apiKey: getConfig('REACT_APP_FIREBASE_API_KEY'),
  projectId: getConfig('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getConfig('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getConfig('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getConfig('REACT_APP_FIREBASE_APP_ID'),
  measurementId: getConfig('REACT_APP_FIREBASE_MEASUREMENT_ID'),
};

const firebaseInit = (): FirebaseApp => {
  return initializeApp(firebaseConfig);
};

export default firebaseInit;
