// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNegG2kURSuCtLs9cKPExxGtcuN6rcl58",
    authDomain: "my-new-web-app-ce424.firebaseapp.com",
    projectId: "my-new-web-app-ce424",
    storageBucket: "my-new-web-app-ce424.appspot.com",
    messagingSenderId: "859333011498",
    appId: "1:859333011498:web:c4ea99188a35362461fb53",
    measurementId: "G-KM15670BDQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// // // dev local
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export { auth, db, storage, app };
