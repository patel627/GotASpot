import React, { Component } from 'react';
import Listings from './Listings';
import logo from './logo.svg';
import './App.css';
import firebase, {auth, provider} from './firebaselogin.js'
var firebaseutil = require('./firebaseutil.js');


class App extends Component {

  constructor() {
    super();
    this.state = {
      address: '',
      description: '',
      username: '',
      items: [],

      user: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.hangleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);


  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({ user });
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({ user: null });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    firebaseutil.addSpot("userid1", this.state.address, this.state.description, 4, 5, this.state.user.displayName || this.state.user.email, ["good", "bad"]);

    this.setState({
      address: '',
      username: '',
      description: ''
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user)
        this.setState({ user });
      console.log("USER CHECK: " + user.toString());
    });

    /*const spotsRef = firebase.database().ref('ParkingSpots');
    spotsRef.on('value', (snapshot) => {
      let spots = snapshot.val();
      let newState = [];
      for (let spot in spots) {
        newState.push({
          description: spots[spot].description,
          owner: spots[spot].owner
        });
      }

      this.setState({
        spots: newState
      });
    });*/
  }

  removeItem(spaceId) {
    firebase.database().ref(`/ParkingSpaces/${spaceId}`).remove();
  }

  /*render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Got a Spot?</h1>
          </header> 
          <Listings/>
        </div>
      );
    }
  }*/

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1 className="App-title">Got a Spot?</h1>
            {this.state.user ? <button onClick={this.logout}>Logout</button> : <button onClick={this.login}>Log In</button>}
          </div>
        </header>
       {this.state.user?<Listings />: <p>Not logged in</p> } 
      </div>
    );
  }
}

export default App;
