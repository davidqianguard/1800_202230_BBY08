//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDICNxoRBy-D1H1X4K03DvsAJr1ywz9p1s",
    authDomain: "comp1800-bby08-216f1.firebaseapp.com",
    projectId: "comp1800-bby08-216f1",
    storageBucket: "comp1800-bby08-216f1.appspot.com",
    messagingSenderId: "116773417218",
    appId: "1:116773417218:web:7706bc7fdd48548401121b"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();