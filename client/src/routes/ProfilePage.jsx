import React from "react";
import PropTypes from "prop-types";
import ApiService from "../services/ApiService";

class ProfilePage extends React.Component {

    static get propTypes() {
        return {
            user: PropTypes.object
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            user: props.user
        };
    }

    componentWillMount() {
        if(this.state.user.id) {
            this.fetchUser();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            this.setState({ user: this.props.user });
        }
    }

    fetchUser() {
        if (this.state.user.id) {
            ApiService.get(`api/v1/users/${this.state.user.id}`).then(response => {
                this.setState({
                    user: {
                        id: response.json.id,
                        name: response.json.name,
                        email: response.json.email
                    },
                    addressBook: response.json.address_books,
                    mailboxes: response.json.mailboxes
                });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        if(this.state.user.name && this.state.addressBook && this.state.mailboxes) {
            return (
                <div>
                    <h1>
                        Profile
                    </h1>
                    <h3>Name: {this.state.name}</h3>
                    <h3>Friends:</h3>
                    <ul>
                        {this.state.addressBook.map(f => {return <li key={f.id}>{f.mailbox.owner.name} - {f.mailbox.alias}</li>;})}
                    </ul>
                    <h3>Mailboxes:</h3>
                    <ul>
                        {this.state.mailboxes.map(f => { return <li key={f.id}>{f.alias}</li>; })}
                    </ul>
                </div>
            );
        } else {
            this.fetchUser();
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

export default ProfilePage;