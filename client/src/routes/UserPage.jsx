import React from "react";
import UserList from "../components/UserList/UserList";

class UserPage extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    Users
                </h1>
                <UserList/>
            </div>
        );
    }
}

export default UserPage;