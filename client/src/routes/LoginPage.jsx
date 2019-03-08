import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import AddUserForm from "../components/AddUserForm";
import PropTypes  from "prop-types";

class LoginPage extends React.Component {

    static get propTypes() {
        return {
            onLogin: PropTypes.func
        };
    }

    constructor(props) {
        super(props);
        this.state = { 
            email: "", 
            password: "",
            redirectToHome: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.quickLogin = this.quickLogin.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.login(this.state.email, this.state.password);
    }

    quickLogin(event) {
        event.preventDefault();
        this.login("test@test.com", "testpassword1");
    }

    login(email, password) {
        const onLogin = this.props.onLogin;
        AuthService.login(email, password).then((response) => {
            let client = response.headers.get("client");
            let accessToken = response.headers.get("access-token");
            let uid = response.headers.get("uid");
            let expires = response.headers.get("expiry");

            //TODO error check fields

            onLogin(client, accessToken, uid, expires, response.json.data);
            this.setState({redirectToHome: true});
        }).catch(error => { throw(error); });
    }

    render() {
        if(this.state.redirectToHome) {
            return ( <Redirect to='/'/> );
        }
        return (
            <div>
                <h1>
                  Login
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input 
                            name="email"
                            type="text" 
                            value={this.state.email} 
                            onChange={this.handleChange} />
                        <input 
                            name="password"
                            type="text"
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.quickLogin}>
                    <button type="submit">
                      Quick Login
                    </button>
                </form>
                <h1> Register </h1>
                <AddUserForm 
                    onSubmit={this.login.bind(this)} />
            </div>
        );
    }
}

export default LoginPage;