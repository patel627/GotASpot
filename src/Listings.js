import React, { Component } from 'react';
import Axios from 'axios';
//import { Listing } from './Listing';
import firebase from './firebaselogin.js'


class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLatitude: 0,
            currentLongitude: 0,
            allListings: [],
            loading: false
        };

        console.log("it reached here");
        //this.refresh();
    }

    componentWillMount() {
        var spaces = firebase.database().ref('ParkingSpaces');
        console.log('refresh');
        //this.state.allListings = [];
        var readData = []
        this.setState({ loading: true });
        spaces.once("value").then((datamap) => {
            for (let key in datamap.val()) {
                console.log('current spaces ' + readData.push({
                    Address: datamap.val()[key].Address,
                    Description: datamap.val()[key].Description
                }));
                /*console.log(key);
                console.log(spotVal.Address);
                console.log(spotVal.Description);*/

                /*var curLat, curLong;
                toLat = spaces[i].latitude;
                toLong = spaces[i].longitude;
                var distanceBetween = distanceFrom(toLat, toLong);
                spaces[i].time = distanceBetween.rows.elements.duration;
                spaces[i].distance = distanceBetween.rows.elements.distance;*/
            }

            this.setState({
                allListings: readData,
                loading: false
            });
        });
    }

    render() {
        if (this.state.loading) {
            console.log("loading.....");
        }
        console.log('number of spaces ' + this.state.allListings.length);
        var i;
        for (i = 0; i < this.state.allListings.length; i++) {
            console.log(this.state.allListings[i].Address);
        }
        console.log("rendering");
        var ulist = [];
        var i;
        for (i = 0; i < this.state.allListings.length; i++) {
            ulist.push(this.renderItem(i, 'listing' + i));
        }
        return ulist;
    }

    renderItem(index, key) {

        console.log('parking space ' + index);
        return (
            <div className="button">
                <div className="section-result-content">
                    <div className="section-result-text-content">
                        <div className="section-result-header">
                            <div className="section-result-title-container">
                                <h3 className="section-result-title">
                                    {this.state.allListings[index].Address}
                                </h3>
                            </div>
                        </div>
                        <div className="section-result-details-container">
                            <div className="section-result-details">
                                {this.state.allListings[index].Description}
                            </div>
                            <span className="section-result-separator">.</span>
                            <div className="section-result-details">
                                {this.state.allListings[index].CurrentUser}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-divider section-divider-bottom-line">
                </div>
            </div>
        );
    }


    refresh() {
        console.log("refreshing");
        this.getSpaces();
    }


    getSpaces() {
        var spaces = firebase.database().ref('ParkingSpaces');
        console.log('refresh');
        this.state.allListings = [];
        spaces.on("value", (datamap) => {
            var i;
            var newState = [];
            for (var key in datamap.val()) {
                    console.log('current spaces ' + newState.push(
                        {
                            Address: datamap.val()[key].Address,
                            Description: datamap.val()[key].Description,
                            Key: key,
                            CurrentUser: datamap.val()[key].CurrentUser
                        }
                    ));
                /*console.log(key);
                console.log(spotVal.Address);
                console.log(spotVal.Description);*/

                /*var curLat, curLong;
                toLat = spaces[i].latitude;
                toLong = spaces[i].longitude;
                var distanceBetween = distanceFrom(toLat, toLong);
                spaces[i].time = distanceBetween.rows.elements.duration;
                spaces[i].distance = distanceBetween.rows.elements.distance;*/
            }
            this.setState({
                allListings: newState
            });
        });
        /*this.allListings = [
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
        ];*/
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