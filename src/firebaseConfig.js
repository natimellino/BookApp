import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAu01PuUvUvLDSCK20QiozpyI00EdmV48w",
    authDomain: "bookapp-fd3a9.firebaseapp.com",
    projectId: "bookapp-fd3a9",
    storageBucket: "bookapp-fd3a9.appspot.com",
    messagingSenderId: "1005449618803",
    appId: "1:1005449618803:web:7b42648156924f8383d106"
  };
  
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);