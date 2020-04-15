import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import axiosInstance from "./common/axiosApi";



class Login extends Component {
    constructor(props) {
        super(props);
        this.loginState = props.login
        this.state = { username: "", password: "", error: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.set('username', this.state.username);
        formData.set('password', this.state.password);
        // TODO: more abstraction
        axiosInstance.post('/token/',
            formData
        ).then(
            result => {
                axiosInstance.defaults.headers['Authorization'] = "Bearer " + result.data.access
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                this.loginState()
            }
        ).catch(error => {
            if (error.response.status === 401) {
                this.setState({
                    error: true
                }
                )
            } else {
                console.log(error)
            }
        })
    }

    render() {
        return (
            <div>Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <Button type="submit" variant="contained" color="primary" value="Submit" >Submit</Button>
                </form>
                <ErrorMessage error={this.state.error} />
            </div>
        )
    }
}

const ErrorMessage = (info) => {
    if (info.error) {
        return <div>username or password wrong</div>
    }
    return null
}
export default Login;