import React, { Component } from 'react';
import Axios from 'axios';
//import { Listing } from './Listing';
import firebase from './firebaselogin.js'
var firebaseutil = require('./firebaseutil.js');


class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.userName,
            currentLatitude: 0,
            currentLongitude: 0,
            allListings: [],
            loading: false
        };

        console.log("it reached here");
        //this.refresh();
        //this.onListingClick = this.onListingClick.bind(this);
    }

    componentWillMount() {
        this.getSpaces();
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
        return (
            <div class="section-listbox section-scrollbox scrollable-y scrollable-show">
                {ulist}
            </div>
        );
    }

    renderItem(index, key) {

        console.log('parking space ' + index);
        return (
            <div
                role="option"
                tabindex="0"
                class="section-result"
                jsaction="pane.resultSection.click;keydown:pane.resultSection.keydown;mouseover:pane.resultSection.in;mouseout:pane.resultSection.out;focus:pane.resultSection.focusin;blur:pane.resultSection.focusout"
                jsan="t-kpvi_-9WUes,7.section-result,0.data-result-index,0.jstrack,0.ved,0.vet,0.role,0.tabindex,22.jsaction">
                <div className="button" key={this.state.allListings[index].Key} onClick={() => { this.onListingClick(this.state.allListings[index].Key) }}>
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
                                <span className="section-result-details">
                                    {this.state.allListings[index].Description} . {this.state.allListings[index].CurrentUser}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="section-divider section-divider-bottom-line">
                    </div>
                </div>
            </div>
        );
    }

    accessedKey;
    onListingClick(key) {
        console.log(key + " selected");
        this.accessedKey = key;
        firebaseutil.getSpaceInfo(key, this.updateUser);
    }

    updateUser(data) {
        if (data.CurrentUser === this.state.currentUser) {
            firebaseutil.markOcupied(this.accessedKey, '');
        } else {
            firebaseutil.markOcupied(this.accessedKey, this.state.currentUser);
        }
    }



    refresh() {
        console.log("refreshing");
        this.getSpaces();
    }


    getSpaces() {
        var spaces = firebase.database().ref('ParkingSpaces');
        console.log('refresh');
        //this.state.allListings = [];
        var readData = []
        this.setState({ loading: true });
        spaces.once("value").then((datamap) => {
            for (let key in datamap.val()) {
                console.log('current spaces ' + readData.push({
                    Address: datamap.val()[key].Address,
                    Description: datamap.val()[key].Description,
                    Key: key,
                    CurrentUser: datamap.val()[key].CurrentUser
                }));

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