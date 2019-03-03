import React from 'react';

export default function UserDetail(props) {
    return (
        <div>
            <span>User: {props.user.id}</span>
        </div>
    );
}