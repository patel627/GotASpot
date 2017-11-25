import React, { Component } from 'react';
import Axios from 'axios';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB0CQbZJbrYG0gNgh4RHPEOu7YuBto_hac",
    authDomain: "gotaspot-b1dcc.firebaseapp.com",
    databaseURL: "https://gotaspot-b1dcc.firebaseio.com",
    projectId: "gotaspot-b1dcc",
    storageBucket: "gotaspot-b1dcc.appspot.com",
    messagingSenderId: "722284475655"
};
var firebaseApp = firebase.initializeApp(config);
class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allListings: []
        };
    }
    init() {
    }
    beginSearch() {

    }
    refresh() {
        this.state.allListings = firebaseApp.database().ref("ParkingSpaces");

    }

    distanceFrom(latitutde, longitude, destLatitude, destLongitude) {
        distRequest = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        distRequest += "origins=" + latitutde + "," + longitude;
        distRequest += "&destinations=" + destLatitude + "," + destLongitude;
        distRequest += "&mode=walking";
        Axios.get(distRequest, {
            origins: latitude + "," + longitude,
            destinations: destLatitude + "," + destLongitude,
            mode: "walking"
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
}