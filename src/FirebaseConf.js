import firebase from 'firebase/app'
import "firebase/messaging"
const firebaseConfig = {
  apiKey: "AIzaSyAplVeDf5gUVF_YBKa25ED6arKg-ZJsKUg",
  authDomain: "real-estates-55c98.firebaseapp.com",
  projectId: "real-estates-55c98",
  storageBucket: "real-estates-55c98.appspot.com",
  messagingSenderId: "362833495828",
  appId: "1:362833495828:web:70ea08f040bc8e8b5b6401",
  measurementId: "G-HXX0NBFJEW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export default messaging;