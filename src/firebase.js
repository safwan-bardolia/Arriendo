import firebase from 'firebase'

// config from firebase-console
const firebaseConfig = {
    apiKey: "AIzaSyCDj2tfjz0EQv1HvU0OzfBufkKKRYFNs9g",
    authDomain: "arriendo-5fcf6.firebaseapp.com",
    projectId: "arriendo-5fcf6",
    storageBucket: "arriendo-5fcf6.appspot.com",
    messagingSenderId: "438021251342",
    appId: "1:438021251342:web:3bd7bc3b86fec16036375f",
    measurementId: "G-3CJFSRGJ41"
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