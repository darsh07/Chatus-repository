import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD8mpTPhNRfxavlRHpZXRiXkQ49fsdussQ",
    authDomain: "capstone-project-19b.firebaseapp.com",
    projectId: "capstone-project-19b",
    storageBucket: "capstone-project-19b.appspot.com",
    messagingSenderId: "1038592443157",
    appId: "1:1038592443157:web:cc64111a4e4ec677e75f1c"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.
  GoogleAuthProvider();

  export { auth, provider};
  export default db;