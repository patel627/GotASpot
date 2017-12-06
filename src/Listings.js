import React, { Component } from 'react';
//import Axios from 'axios';
import { FlatList, StyleSheet, Text, View } from 'react-native';
const firebase = require("./firebaselogin.js");

class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLatitude:0,
            currentLongitude:0,
            allListings:[]
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.allListings}
                    renderItem={({ item }) =>
                        <div>
                            <Text style={styles.address}>{item.key}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </div>}
                />
            </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    address: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    description: {
        padding: 10,
        fontSize: 10,
        height: 44,
    },

})

export default Listings;