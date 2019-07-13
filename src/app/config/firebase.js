import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCwa8yOHLVfXjy5nQkm4QPT5N1-AZdl0vc",
  authDomain: "myevents-245402.firebaseapp.com",
  databaseURL: "https://myevents-245402.firebaseio.com",
  projectId: "myevents-245402",
  storageBucket: "myevents-245402.appspot.com",
  messagingSenderId: "195494814102",
  appId: "1:195494814102:web:83c4696c8f011790"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;