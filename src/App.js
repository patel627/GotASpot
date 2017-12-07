import React, { Component } from 'react';
import Listings from './Listings';
import logo from './logo.svg';
import './App.css';

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
    });

    const spotsRef = firebase.database().ref('ParkingSpots');
    spotsRef.on('value', (snapshot) => {
      let spots = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          description: items[item].description,
          owner: items[item].owner
        });
      }

      this.setState({
        items: newState
      });
    });
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
        <header className="wrapper">
          <h1> Got a Spot?</h1>
          {this.state.user ? <button onClick={this.logout}>Logout</button>: <button onClick={this.logout}>Logout</button>}
        </header>
        <Listings />
      </div>
    );
  }
}

export default App;
