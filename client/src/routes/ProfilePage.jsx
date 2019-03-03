import React from 'react';

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        
        this.api = props.api;
        this.state = {
            uid: this.state.loggedInUser,
            id: "",
            name: "",
            email: "",
            addressBook: [],
            mailboxes: []
        };
    }

    componentWillMount() {
        this.api.get(`api/v1/users/${this.state.uid}`).then(response => {
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
    }
}

export default ProfilePage;