import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBtavtevhkPKucJwgyDvJ9B-MacY4rvFYo",
  authDomain: "chat-app-5e2b8.firebaseapp.com",
  projectId: "chat-app-5e2b8",
  storageBucket: "chat-app-5e2b8.appspot.com",
  messagingSenderId: "617675872510",
  appId: "1:617675872510:web:5980b000d968c521f2edaf",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };