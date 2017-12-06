import React, { Component } from 'react';
//import Axios from 'axios';
import ReactList from 'react-list';
import { Listing } from './Listing';
const firebase = require("./firebaselogin.js");

class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLatitude: 0,
            currentLongitude: 0,
            allListings: []
        };
        this.refresh();
    }

    render() {
        return (
            <div >
                <ReactList
                    data={this.state.allListings}
                    itemRenderer={this.renderItem}

                />
            </div>
        );
    }

    renderItem(index, key) {
        console.log('parking space ' + index);
        return (
            <div key={key}>
                <text>{this.state.allListings[index].address}</text>
                <text>{this.state.allListings[index].description}</text>
            </div>
        );
    }


    refresh() {
        var spaces = firebase.database().ref("ParkingSpaces");
        /*var i;
        for (i = 0; i < spaces.length; i++) {
            var curLat, curLong;
            toLat = spaces[i].latitude;
            toLong = spaces[i].longitude;
            var distanceBetween = distanceFrom(toLat, toLong);
            spaces[i].time = distanceBetween.rows.elements.duration;
            spaces[i].distance = distanceBetween.rows.elements.distance;
        }*/
    }

    sortAllListings() {
        // do nothing rn
    }

    compareListings(listing1, listing2) {
        return 0;
    }

    /*distanceFrom(destLatitude, destLongitude) {
        var distRequest = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        var received = Axios.get(distRequest, {
            origins: this.state.currentLatitude + "," + this.state.currentLongitude,
            destinations: destLatitude + "," + destLongitude,
            mode: "walking"
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        return JSON.parse(received);
    }*/
}

export default Listings;