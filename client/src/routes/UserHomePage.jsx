import React from "react";
import PropTypes from "prop-types";
import ApiService from "../services/ApiService";

class UserHomePage extends React.Component {

    static get propTypes() {
        return {
            user: PropTypes.object
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        if(this.state.user.id) {
            this.fetchHomePageDetails();
        }
    }

    fetchHomePageDetails() {
        ApiService.get(`api/v1/users/${this.state.user.id}`).then(response => {
            this.setState({
                id: response.json.data.id,
                name: response.json.data.name,
                email: response.json.data.email,
                addressBook: response.json.data.address_books,
                mailboxes: response.json.data.mailboxes
            });
        }).catch(error => {
            console.log(error);
        });
    }
  
    render() {
        if (this.state.user.id && !this.state.user.addressBook) {
            this.fetchHomePageDetails();
        }

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