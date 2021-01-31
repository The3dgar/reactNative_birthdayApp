import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_APIKEY,
  authDomain: process.env.EXPO_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.EXPO_FIREBASE_DATABASEURL,
  projectId: process.env.EXPO_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.EXPO_FIREBASE_APPID,
};

export default firebase.initializeApp(firebaseConfig);