import React, { Component } from 'react';
//import Axios from 'axios';
import ReactList from 'react-list';
//import { Listing } from './Listing';
const firebase = require("./firebaselogin.js");
class Listings extends Component {
    allListings = [];
    constructor(props) {
        super(props);
        this.state = {
            currentLatitude: 0,
            currentLongitude: 0,
        };

        console.log("it reached here");
        this.refresh();
    }

    render() {
        console.log("rendering");
        return (
            <div >
                <ReactList
                    itemRenderer={this.renderItem}
                    type='uniform'
                />
                <div>hello</div>
            </div>
        );
    }

    renderItem(index, key) {
        console.log('parking space ' + index);
        return (
            <div key={key}>
                <div>hi</div>
                <div>{this.allListings[index].Address}</div>
                <div>{this.allListings[index].Description}</div>
            </div>
        );
    }


    refresh() {
        console.log("refreshing");
        this.getSpaces();
    }


    getSpaces() {
        /*var spaces = firebase.database().ref("ParkingSpaces");
        console.log('refresh');
        spaces.on("value", (datamap) => {
            this.state.allListings = Object.values(datamap.val());
            var i;
            for (i = 0; i < this.state.allListings.length; i++) {
                console.log(this.state.allListings[i].address);

                var curLat, curLong;
                toLat = spaces[i].latitude;
                toLong = spaces[i].longitude;
                var distanceBetween = distanceFrom(toLat, toLong);
                spaces[i].time = distanceBetween.rows.elements.duration;
                spaces[i].distance = distanceBetween.rows.elements.distance;
            }
        });*/
        this.allListings = [
            {
                CurrentUser: "N/A",
                Address: "nowhereland",
                Description: "this goes to nowhere",
                Latitude: 0,
                Longitude: 0,
                Owner: "owner",
                Reivews: "reviews",
            }, {
                CurrentUser: "N/A",
                Address: "nowhereland2",
                Description: "this goes to nowhere also",
                Latitude: 0,
                Longitude: 0,
                Owner: "owner",
                Reivews: "reviews",
            }
        ];
        var i;
        for (i = 0; i < this.allListings.length; i++) {
            console.log(this.allListings[i].Address);
        }
        console.log("has spaces");
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