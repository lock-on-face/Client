import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCNKtQUzWX39NP5b7tc1dccTlc7Mv1Xq4A",
  authDomain: "lockersys.firebaseapp.com",
  databaseURL: "https://lockersys.firebaseio.com",
  projectId: "lockersys",
  storageBucket: "lockersys.appspot.com",
  messagingSenderId: "659901433783"
};
  
firebase.initializeApp(config);
var db = firebase.database()

export default db