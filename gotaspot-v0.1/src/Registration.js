import React, { Component } from 'react';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <h3>User name:</h3>
                <br/>
                <input type="text" name="username" onChange = {(event,newValue) => this.setState({username:newValue})}/>
                {this.usernameAvailable()}
                <br/>
                <h3>User password:</h3>
                <br/>
                <input type="password" name="psw" onChange = {(event,newValue) => this.setState({password:newValue})}/>
                <br/>
                <input type = "password" name = "cfm" onChange = {(event,newValue) => this.verifyPassword(event,newValue)}/>
                <br/>
                <input type="submit" onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
    verifyPassword(event,newValue) {
        
    }
    usernameAvailable() {
        return;
    }
    handleClick(event) {
        // something about firebase login stuff here???????
        // IM SO CONFUSED WHAT ARE WE EVEN WORKING ON
    }
}