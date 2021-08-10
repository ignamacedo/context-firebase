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

//Hace que fire quede conectado a la app de la consola
const app = firebase.initializeApp(firebaseConfig);

//empiezo a configurar los servicios
export const getFireStore = () => {
    //retorna el acceso al servicio firestore
   return firebase.firestore(app);
}
