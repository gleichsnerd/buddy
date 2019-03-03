import React from 'react';

class AddFriend extends React.Component {
    constructor(props) {
        super(props);

        this.api = props.api;

        this.state = {
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.api.post('api/v1/friendships', {
            friend: this.props.user.id
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button type="submit">
                    Add Friend
                </button>
            </form>
        );
    }
}

export default AddFriend;