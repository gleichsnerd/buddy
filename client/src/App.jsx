import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import authRequired from './routes/AuthRequired'
import HomePage from './routes/HomePage'
import UserHomePage from './routes/UserHomePage'
import UserPage from './routes/UserPage'
import ProfilePage from './routes/ProfilePage'
import LoginPage from './routes/LoginPage'
import ApiService from './services/ApiService'
import AuthService from './services/AuthService'

import './App.css';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    let cookies = props.cookies;
    
    let client = cookies.get("client");
    let token = cookies.get("token");
    let uid = cookies.get("uid");

    let isLoggedIn = client != null && client !== ""
      && token != null && token !== ""
      && uid != null && uid !== "";

    // ApiService = new ApiService(this.updateAuth.bind(this), client, token, uid);
    this.state = {
      isLoggedIn: isLoggedIn,
      uid: uid || "",
      user: {}
    };
  }

  componentWillMount() {
    if(this.state.isLoggedIn) {
      this.validateLoggedIn().then(_ => {
        return ApiService.get(`api/v1/users/${this.state.uid}`);
      }).then(user => {
        this.setState({ user: user });
      }).catch(_ => {
        this.onLogout();
      })
    }
  }

  validateLoggedIn() {
    return AuthService.validate().then(_ => {
      this.setState({ isLoggedIn: AuthService.isLoggedIn() });
    }).catch(_ => {
      this.setState({ isLoggedIn: AuthService.isLoggedIn() });
    }).then(user => {
      this.setState({ user: user });
    }).catch(error => {
      console.log(error);
    });
  }

  updateAuth(client, token, uid, expires) {
    const { cookies } = this.props;

    let expireDate = new Date(parseInt(expires, 10));

    cookies.set("client", client, { expires: expireDate });
    cookies.set("token", token, { expires: expireDate });
    cookies.set("uid", uid, { expires: expireDate });

    // ApiService.client = client;
    // ApiService.token = token;
    // ApiService.uid = uid;

    this.setState({ 
      isLoggedIn: AuthService.isLoggedIn(),
      loggedInUser: uid
    })
  }

  logout() {
    AuthService.logout().then(_ => {
      this.onLogout();
    })
  }

  onLogout() {
    let cookies = this.props.cookies;

    cookies.remove("client");
    cookies.remove("token");
    cookies.remove("uid");

    // ApiService = ApiService.new();

    this.setState({ isLoggedIn: AuthService.isLoggedIn() })

    // this.props.history.push('/')
  }

  render() {
    let ProppedUserHomePage = authRequired((props) => {
      return (
        <UserHomePage

          {...props} />
      )
    }, AuthService);

    let ProppedUserPage = authRequired((props) => {
      return (
        <UserPage

          {...props} />
      )}, AuthService);

    let ProppedProfilePage = authRequired((props) => {
      return (
        <ProfilePage

          uid={this.state.loggedInUser}
          {...props} />
      )
    }, AuthService);

    let ProppedLoginPage = (props) => {
      return (
        <LoginPage
          onLogin={this.updateAuth.bind(this)}

          {...props} />
      );
    };

    return (
      <Router>
        <div>
          <ul>

            <li><Link to="/">Home</Link></li> 
            <li><Link to="/users">Users</Link></li>
            {!this.state.isLoggedIn && <li><Link to="/login">Login</Link></li>}
            {this.state.isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
            {this.state.isLoggedIn && <h3>{this.state.loggedInUser}</h3>}
            {this.state.isLoggedIn && <li><a href="/" onClick={this.logout.bind(this)}>Logout</a></li>}
          </ul>
        
          <Route exact path="/" component={!this.state.isLoggedIn ? HomePage : ProppedUserHomePage} />
          <Route path="/users" component={ProppedUserPage} />
          <Route path="/profile" component={ProppedProfilePage} />
          <Route path="/login" render={ProppedLoginPage} />
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
