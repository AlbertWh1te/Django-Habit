import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import { userContext } from './common/userContext';
import "./App.css";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    logout() {
        this.setState({ user: {} });
    }


    render() {
        const value = {
            user: this.state.user,
            logoutUser: this.logout
        }

        return (
            <div className="site">
                <userContext.Provider value={value}>
                    <nav className="nav">
                        <Link className={"nav-link"} to={"/"}>Home</Link>
                        <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    </nav>
                    <main>
                        <h1>Ahhh after 10,000 years I'm free. Time to conquer the Earth!</h1>
                        <Switch>
                            <Route exact path={"/login/"} component={Login} />
                            <Route path={"/"} render={() => <div>Home again</div>} />
                        </Switch>
                    </main>
                </userContext.Provider>
            </div>
        );
    }
}

export default App;