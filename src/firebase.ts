import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyClJB2TQDO6bzrseGi9zxEAMZBTVQTMfvg",
    authDomain: "padelamericano.firebaseapp.com",
    databaseURL: "https://padelamericano.firebaseio.com",
    projectId: "padelamericano",
    storageBucket: "padelamericano.appspot.com",
    messagingSenderId: "101975613230",
    appId: "1:101975613230:web:6675f82c80059f943464bf",
    measurementId: "G-JVN41HK7ZM",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
// const usersCollection = db.collection("users");

// export utils/refs
export { db, auth };
