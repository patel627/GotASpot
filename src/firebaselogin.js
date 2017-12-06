var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyB0CQbZJbrYG0gNgh4RHPEOu7YuBto_hac",
    authDomain: "gotaspot-b1dcc.firebaseapp.com",
    databaseURL: "https://gotaspot-b1dcc.firebaseio.com",
    projectId: "gotaspot-b1dcc",
    storageBucket: "gotaspot-b1dcc.appspot.com",
    messagingSenderId: "722284475655"
  };
  firebase.initializeApp(config);

module.exports = firebase; 