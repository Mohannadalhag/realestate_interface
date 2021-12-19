// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  
  apiKey: "AIzaSyAplVeDf5gUVF_YBKa25ED6arKg-ZJsKUg",
  authDomain: "real-estates-55c98.firebaseapp.com",
  projectId: "real-estates-55c98",
  storageBucket: "real-estates-55c98.appspot.com",
  messagingSenderId: "362833495828",
  appId: "1:362833495828:web:70ea08f040bc8e8b5b6401",
  measurementId: "G-HXX0NBFJEW"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();