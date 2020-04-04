import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB9rCKxX2X0K_V4B5fJooQwfmtpJykNpbI",
  authDomain: "shishcowkachat.firebaseapp.com",
  databaseURL: "https://shishcowkachat.firebaseio.com",
  projectId: "shishcowkachat",
  storageBucket: "shishcowkachat.appspot.com",
  messagingSenderId: "195464089047",
  appId: "1:195464089047:web:cb3ddbfc1a46ddf081cf92"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();