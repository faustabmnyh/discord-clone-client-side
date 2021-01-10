import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAr5-52k1s2ajMHl-kYxpvBGWmEExjAf9E",
  authDomain: "discord-clone-430d4.firebaseapp.com",
  databaseURL: "https://discord-clone-430d4.firebaseio.com",
  projectId: "discord-clone-430d4",
  storageBucket: "discord-clone-430d4.appspot.com",
  messagingSenderId: "263768165136",
  appId: "1:263768165136:web:040b11277c8507fe2a3395",
  measurementId: "G-2X0EVPW00P",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
