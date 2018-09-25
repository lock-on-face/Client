import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDTk1Z7kmqukNaoqYPlTYKf5OLTozNXrLA",
  authDomain: "lockonface.firebaseapp.com",
  databaseURL: "https://lockonface.firebaseio.com",
  projectId: "lockonface",
  storageBucket: "lockonface.appspot.com",
  messagingSenderId: "71461917224"
};
  
firebase.initializeApp(config);
var db = firebase.database()

export default db