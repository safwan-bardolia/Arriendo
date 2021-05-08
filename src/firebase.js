import firebase from 'firebase'

// config from firebase-console
const firebaseConfig = {
  apiKey: "AIzaSyATkOIB4HUnvOPvIDBqU1TrbvdtO1Y9HFw",
  authDomain: "arriendo-39bd3.firebaseapp.com",
  projectId: "arriendo-39bd3",
  storageBucket: "arriendo-39bd3.appspot.com",
  messagingSenderId: "101957066058",
  appId: "1:101957066058:web:b785e80bc328b3d62f75b3",
  measurementId: "G-NE0D1TCHWM"
};

// initialize our app with firebase config (connect our app with firebase)
const firebaseApp = firebase.initializeApp(firebaseConfig)

// get access to the firebase-firestore DB
const db = firebaseApp.firestore();

// get the firebase auth (for signin/signout functionality)
const auth = firebase.auth();

// to tell firebase that we need google-auth service
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};    // name export
export default db;          // default export