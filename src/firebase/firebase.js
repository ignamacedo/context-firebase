import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnlQeF7piUfWOMDNMr4fU42AAVAV14wQ8",
    authDomain: "cosmosstoremacedo-a92b3.firebaseapp.com",
    projectId: "cosmosstoremacedo-a92b3",
    storageBucket: "cosmosstoremacedo-a92b3.appspot.com",
    messagingSenderId: "1003154722249",
    appId: "1:1003154722249:web:7559303a86e268187fac18"
};

const app = firebase.initializeApp(firebaseConfig);

export const getFireStore = () => {
   return firebase.firestore(app);
}
