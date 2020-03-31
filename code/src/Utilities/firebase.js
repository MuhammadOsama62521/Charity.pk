import * as firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDyjoke7ygQKgkraAeHObid4imEnTOzXkM",
    authDomain: "charity-org.firebaseapp.com",
    databaseURL: "https://charity-org.firebaseio.com",
    projectId: "charity-org",
    storageBucket: "charity-org.appspot.com",
    messagingSenderId: "615864073304",
    appId: "1:615864073304:web:f2ff6806ab88acf2945e2d",
    measurementId: "G-0JT59SQGDQ"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
// firebase.database()

export {
  storage,firebase as default
}
