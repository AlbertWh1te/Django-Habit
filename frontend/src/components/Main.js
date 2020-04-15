import React from "react"
import Button from '@material-ui/core/Button'
import { Switch, Route, Link } from "react-router-dom"
import { userContext } from './common/UserContext'
import Login from "./Login"
import HabitHistory from "./habit/HabitHistory"

function Main(props) {
    return (
        <div>
            <userContext.Consumer>
                {({ user, logoutUser, loginUser }) => {
                    if (user !== true) {
                        return (
                            <div>
                                <nav className="nav">
                                    <Link className={"nav-link"} to={"/"}>Home</Link>
                                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                                </nav>
                                <Switch>
                                    <Route exact path={"/login/"} component={() => <Login login={loginUser} />} />
                                    <Route path={"/"} render={() => <div>Home again</div>} />
                                </Switch>
                            </div>
                        );
                    }
                    // logged in case
                    else {
                        return (
                            <div>
                                <nav className="nav">
                                    <Link className={"nav-link"} to={"/"}>Home</Link>
                                </nav>
                                <Button onClick={logoutUser}>Logout</Button>
                                <Switch>
                                    <Route path={"/"} render={() => <div>Home again</div>} />
                                </Switch>
                                <h1>user is logged in</h1>
                                <HabitHistory />
                            </div>
                        );
                    }
                }}
            </userContext.Consumer>
        </div>
    )
}

export default Main;