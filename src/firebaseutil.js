
const firebase = require("./firebaselogin.js");

  module.exports = {
    getSpaceInfo(spaceUID, callback) {
      console.log(spaceUID);
      let parkingRef = firebase.database().ref('ParkingSpaces').child(spaceUID);
      parkingRef.on('value', (fbdatasnap) => {
          callback(fbdatasnap.val());
        });
      },

      loginUser(email, password) {
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
      },

      addSpot(user_hash, lat, long, owner, reviews) {
        firebase.database().ref('Users').child('user_hash').once('value', function(fbdatasnap) {
          var exists = (fbdatasnap.val() !== null);
          module.exports.addEntryCB(user_hash, lat, long, owner, reviews, exists);
        })
      },
    
      addEntryCB(user_hash, lat, long, owner, reviews, exists) {
        //if (exists == false) return;
        
        var postsRef = firebase.database().ref("ParkingSpaces");
        
        var newPostRef = postsRef.push().set({
          CurrentUser: "N/A",
          Title: "Road 1 Parking Space",
          Latitude: lat,
          Longitude: long,
          Owner: owner,
          Reivews: reviews,
        });
      },
  }

  //module.exports.addSpot("user", "4", "5", "john doe", ["good", "bad"]);
  module.exports.getSpaceInfo('-L-ds8orRwWWlNJ0INya', function(data) {
    console.log(data);
  });


  