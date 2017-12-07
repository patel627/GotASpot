import React, { Component } from 'react';
import Listings from './Listings';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      description:'',
      username:'',
      items:[],

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
      this.setState({user});
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    firebaseutil.addSpot("userid1", this.state.address, this.state.description, 4, 5, this.state.user.displayName ||  this.state.user.email, ["good", "bad"]);
    
    this.setState({
      address: '',
      username: '',
      description: ''
    });
 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Got a Spot?</h1>
        </header> 
        <Listings/>
      </div>
    );
  }
}

export default App;
