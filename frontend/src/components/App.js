import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Main from "./Main";
import { userContext } from './common/UserContext';
import "./App.css";



class App extends Component {

    constructor(props) {
        super(props);

        let access_token = localStorage.getItem('access_token')
        let refresh_token = localStorage.getItem('refresh_token')

        // if it is logged in
        let islogin = false
        if (access_token !== null && refresh_token !== null) {
            islogin = true
        }

        this.state = {
            user: islogin
        }

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