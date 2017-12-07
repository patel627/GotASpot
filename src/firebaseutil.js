const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyB0CQbZJbrYG0gNgh4RHPEOu7YuBto_hac",
  authDomain: "gotaspot-b1dcc.firebaseapp.com",
  databaseURL: "https://gotaspot-b1dcc.firebaseio.com",
  projectId: "gotaspot-b1dcc",
  storageBucket: "gotaspot-b1dcc.appspot.com",
  messagingSenderId: "722284475655"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


  module.exports = {

    getSpaceInfo(spaceUID, callback) {
      let parkingRef = firebase.database().ref('ParkingSpaces').child(spaceUID);
      parkingRef.on('value', (fbdatasnap) => {
          //console.log(Object.values(fbdatasnap.val())[0]);
          callback(fbdatasnap.val());
        });
      },

      /*loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        // ...
        }),
    
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          callback(user);
          } else {
        // No user is signed in.
          }
        });
      },*/

      addSpot(user_hash, address, desc, lat, long, owner, reviews){
        firebase.database().ref('Users').child(user_hash).once('value', function(fbdatasnap) {
          var exists = (fbdatasnap.val() !== null);
          module.exports.addEntryCB(user_hash, address, desc, lat, long, owner, reviews, exists);
        })
      },
    
      addEntryCB(user_hash, address, desc, lat, long, owner, reviews, exists) {
        console.log(exists);
        if (exists === false) return;
        
        var postsRef = firebase.database().ref("ParkingSpaces");

        
        var newPostRef = postsRef.push().set({
          CurrentUser: "N/A",
          Address: address,
          Description: desc,
          Latitude: lat,
          Longitude: long,
          Owner: owner,
          Reivews: reviews,
        });
      },
  }

  //module.exports.addSpot("userid1", "address", "parking spot on the street next to...", 4, 5, "john doe", ["good", "bad"]);
  //module.exports.addSpot("userid1", "address", "parking spot on the street next to...", 4, 5, "john doe", ["good", "bad"]);
  //module.exports.addSpot("userid1", "address", "parking spot on the street next to...", 4, 5, "john doe", ["good", "bad"]);
  module.exports.getSpaceInfo('f', function(data) { console.log(data);});
