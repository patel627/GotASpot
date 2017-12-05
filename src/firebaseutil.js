const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gotaspot-b1dcc.firebaseio.com/',
  });

  module.exports = {
    getSpaceInfo(spaceUID) {
        admin.database().ref(`/ParkingSpaces/${spaceUID}/`).once('value').then((fbdatasnap) => {
          callback(fbdatasnap.val());
        });
      },

      loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        // ...
        });
    
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          callback(user);
          } else {
        // No user is signed in.
          }
        });
      },

      addSpot(user_hash, lat, long, owner, reviews) {
        admin.database().child('Users').child('user_hash').once('value', function(fbdatasnap) {
          var exists = (fbdatasnap.val() !== null);
          addEntryCB(user_hash, notebook_uuid, _text, _image,
            _caption, _dateCreated, _authorID, _tagArr, exists);
        })
      },
    
      addEntryCB(user_hash, lat, long, owner, reviews, exists) {
        if (exists == false) return;
        
        var postsRef = admin.database().child("ParkingSpaces");
        
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
  