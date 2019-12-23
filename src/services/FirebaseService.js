const  firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/database');
require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyCrWjV27OnQPtEBgd4m7BKGNmSOeQL4oOA',
  authDomain: 'chat-sample-106c0.firebaseapp.com',
  databaseURL: 'https://chat-sample-106c0.firebaseio.com',
  projectId: 'chat-sample-106c0',
  storageBucket: 'chat-sample-106c0.appspot.com',
  messagingSenderId: '919556957764',
  appId: '1:919556957764:web:b517d96591cbde9b6a3e11',
  measurementId: 'G-HHPWYQT261',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

module.exports = {
  initializedFirebase: firebase,
  fireDB: firebase.firestore(),
  realtimeDB: firebase.database(),
  googleAuthProvider: new firebase.auth.GoogleAuthProvider(),
};
