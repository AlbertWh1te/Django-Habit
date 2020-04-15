import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Main from "./Main";
import { userContext } from './common/userContext';
import "./App.css";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: false
        };
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    }

    logout() {
        this.setState({ user: false });
    }

    login() {
        this.setState({ user: true });
    }


    render() {
        const value = {
            user: this.state.user,
            logoutUser: this.logout,
            loginUser: this.login
        }

        return (
            <div className="site">
                <userContext.Provider value={value}>
                    <Main />
                </userContext.Provider>
            </div >
        );
    }
}

export default App;