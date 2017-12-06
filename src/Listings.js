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
var currentLatitude, currentLongitude;
var allListings = [];
class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        init();
    }
    init() {
        refresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={allListings}
                    renderItem={({ item }) =>
                        <Text style={styles.address}>{item.key}</Text>
                        <Text style={styles.description}>{item.description}</Text>}
                />
            </View>
        );
    }


    refresh() {
        var spaces = firebaseApp.database().ref("ParkingSpaces");
        var i;
        for (i = 0; i < spaces.length; i++) {
            var curLat, curLong;
            toLat = spaces[i].latitude;
            toLong = spaces[i].longitude;
            var distanceBetween = distanceFrom(toLat, toLong);
            spaces[i].time = distanceBetween.rows.elements.duration;
            spaces[i].distance = distanceBetween.rows.elements.distance;
        }
    }

    sortAllListings() {
        // do nothing rn
    }

    compareListings(listing1, listing2) {
        return 0;
    }

    distanceFrom(destLatitude, destLongitude) {
        distRequest = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        var received = Axios.get(distRequest, {
            origins: currentLatitude + "," + currentLlongitude,
            destinations: destLatitude + "," + destLongitude,
            mode: "walking"
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        return JSON.parse(received);
    }
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