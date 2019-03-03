import React from 'react';
import AuthService from '../services/AuthService';
import AddUserForm from '../components/AddUserForm';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        email: "", 
        password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.quickLogin = this.quickLogin.bind(this);
  }

  handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
      event.preventDefault();
      console.log(JSON.stringify({
          email: this.state.email,
          password: this.state.password
      }));

      this.login(this.state.email, this.state.password);
  }

  quickLogin(event) {
      event.preventDefault();
      this.login("test@test.com", "testpassword1");
  }

  login(email, password) {
      console.log(`Logging in as ${email}`);

      AuthService.login(email, password).then(response => {
          console.log("Success!");
          let client = response.headers.get("client");
          let accessToken = response.headers.get("access-token");
          let uid = response.headers.get("uid");
          let expires = response.headers.get("expiry");

          //TODO error check fields

          this.props.onLogin(client, accessToken, uid, expires);
      }).catch(error => console.log(error))
  }

  render() {
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