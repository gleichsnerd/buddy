import React from 'react';
import ApiService from '../services/ApiService';

class UserHomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
      id: "",
      name: "",
      email: "",
      addressBook: [],
      mailboxes: []
    };
  }

  componentWillMount() {
    ApiService.get(`api/v1/users/${this.state.uid}`).then(response => {
      this.setState({
        id: response.json.id,
        name: response.json.name,
        email: response.json.email,
        addressBook: response.json.address_books,
        mailboxes: response.json.mailboxes
      });
    }).catch(error => {
      console.log(error);
    })
  } 
  
  render() {
    if(this.state.name != null) {
      return (
          <h1>
              Hello, {this.state.name}
          </h1>
      );
    } else {
      return null;
    }
  }
}

export default UserHomePage;