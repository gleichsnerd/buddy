import React from 'react';
import UserDetail from './UserDetail'
import AddFriend from './AddFriend'

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getUsers().then(users => {
            this.setState({ users: users });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.props.api.get('api/v1/users').then(response => {
                resolve(response.json);
            }).catch(error => {
                console.log(error);
            });
        });
    }

    renderUser(user) {
        return (
            <div key={user.id}>
                <UserDetail key={`user-detail-${user.id}`} user={user} />
                <AddFriend key={`add-friend-${user.id}`} user={user} api={this.props.api} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.users.length}
                {this.state.users.length && this.state.users.map(user => {
                    return this.renderUser(user);
                })}
            </div>
        );
    }
}

export default UserList;