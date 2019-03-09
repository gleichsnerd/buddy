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
            user: props.user,
            mailboxes: [],
            hasLetters: false
        };
    }

    componentWillMount() {
        this.fetchHomePageDetails();
    }

    componentDidUpdate() {
        if (this.props.user.id !== this.state.user.id) {
            this.setState({ user: this.props.user });
        }
    }

    fetchHomePageDetails() {
        if(this.state.user.id) {
            ApiService.get("api/v1/user").then(response => {
                this.setState({
                    user: {
                        id: response.json.id,
                        name: response.json.name,
                        email: response.json.email
                    }
                });
            }).then(() => {
                ApiService.get("api/v1/mailboxes?letters=true").then(response => {
                    const mailboxes = response.json || [];
                    const filledMailboxes = mailboxes.filter((mailbox) => { mailbox.letters.length > 0; });
                    this.setState({
                        mailboxes: mailboxes,
                        hasLetters: filledMailboxes.length
                    });
                });
            }).catch(error => {
                console.log(error);
            });
        }
    }
  
    render() {
        if (this.state.user.id && !this.state.mailboxes.length) {
            this.fetchHomePageDetails();
        }

        if (this.state.user.name != null) {
            return (
                <div>
                    <h1>
                        Hello, {this.state.user.name}
                    </h1>
                    <div>
                        { !this.state.mailboxes.length ? 
                            <h3>Loading...</h3> :
                            this.state.hasLetters ?
                                <div>You have new letters!</div> :
                                <div>No new letters</div>
                        }
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default UserHomePage;