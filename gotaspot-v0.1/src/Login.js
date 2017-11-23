import React, { Component } from 'react';

class Login extends Component {
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
                <br/>
                <h3>User password:</h3>
                <br/>
                <input type="password" name="psw" onChange = {(event,newValue) => this.setState({password:newValue})}/>
                <br/>
                <input type="submit" onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
    handleClick(event) {

    }
}