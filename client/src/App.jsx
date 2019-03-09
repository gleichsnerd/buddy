import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import AuthService from "./services/AuthService";
import CookieService from "./services/CookieService";

import PublicPrivateRoute from "./routes/PublicPrivateRoute";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import HomePage from "./routes/HomePage";
import UserHomePage from "./routes/UserHomePage";
import UserPage from "./routes/UserPage";
import ProfilePage from "./routes/ProfilePage";
import LoginPage from "./routes/LoginPage";

import "./App.css";

class App extends Component {
    static get propTypes() {
        return {
            cookies: instanceOf(Cookies).isRequired
        };
    }
  
    constructor(props) {
        super(props);
        
        CookieService.setCookieCollection(props.cookies);

        this.state = {
            isLoggedIn: false,
            uid: "",
            user: {}
        };
    }

    componentWillMount() {
        const { cookies } = this.props;

        const client = cookies.get("client") || null;
        const token = cookies.get("token") || null;
        const uid = cookies.get("uid") || null;

        const isLoggedIn = client !== null && token !== null && uid !== null;

        if(isLoggedIn) {
            this.validateLoggedIn(client, token, uid).then((user) => {
                if(this.state.isLoggedIn) {
                    this.setState({ user: user });
                }
            }).catch(() => {
                this.logout(true);
            });
        }
    }

    validateLoggedIn(client, token, uid) {
        return new Promise((resolve, reject) => {
            return AuthService.validate(client, token, uid).then((response) => {
                this.setState({ 
                    isLoggedIn: AuthService.isLoggedIn(),
                });

                resolve(response.json.user);
            }).catch(() => {
                this.setState({ isLoggedIn: AuthService.isLoggedIn() });
                reject();
            });
        });
    }

    updateAuth(client, token, uid, expires, user) {
        AuthService.updateAuth(client, token, uid);
        CookieService.updateAuthCookies(client, token, uid, expires);

        this.setState({ 
            isLoggedIn: AuthService.isLoggedIn(),
            user: user
        });
    }

    logout(validationFailed = false) {
        CookieService.clearAuthCookies();
        if(!validationFailed) {
            AuthService.logout().then(() => {
                this.onLogout();
            });
        }
    }

    onLogout() {
        this.setState({ isLoggedIn: AuthService.isLoggedIn() });
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li> 
                        {!this.state.isLoggedIn && <li><Link to="/login">Login</Link></li>}
                        {this.state.isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
                        {this.state.isLoggedIn && <li><a href="/" onClick={this.logout.bind(this)}>Logout</a></li>}
                    </ul>
        
                    <PublicPrivateRoute exact path="/" isLoggedIn={this.state.isLoggedIn} publicComponent={HomePage} privateComponent={UserHomePage} privateComponentProps={{user: this.state.user}}/>
                    <PrivateRoute exact path="/users" component={UserPage} componentProps={{ user: this.state.user }} />
                    <PrivateRoute exact path="/profile" componentProps={{user: this.state.user}} component={ProfilePage}/>
                    <PublicRoute exact path="/login" componentProps={{onLogin: this.updateAuth.bind(this)}} component={LoginPage}/>
                </div>
            </Router>
        );
    }
}

export default withCookies(App);
