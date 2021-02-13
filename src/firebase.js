import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const base = firebase.initializeApp({
    apiKey: "AIzaSyAkzHNULZuF9ecMEx01X9tXJogj7qQcfG8",
    authDomain: "fir-client-app-c1a6d.firebaseapp.com",
    projectId: "fir-client-app-c1a6d",
    storageBucket: "fir-client-app-c1a6d.appspot.com",
    messagingSenderId: "1027783589919",
    appId: "1:1027783589919:web:bdc1f32bca93c7bc9a952a"
  }
);

export default base;