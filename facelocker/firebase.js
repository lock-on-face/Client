const firebase = require('firebase')

var config = {
    apiKey: "AIzaSyAsbyEqKMDkeHzzKdZNl5QV739X_fWPGmA",
    authDomain: "facelockers.firebaseapp.com",
    databaseURL: "https://facelockers.firebaseio.com",
    projectId: "facelockers",
    storageBucket: "",
    messagingSenderId: "266094262497"
  };
firebase.initializeApp(config);
var db = firebase.database()

module.exports = db