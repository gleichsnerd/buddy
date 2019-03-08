import React from "react";
import PropTypes from "prop-types";
import AuthService from "../services/AuthService";
import {
    Route,
    Redirect
} from "react-router-dom";

export default function PrivateRoute({ component: Component, componentProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                AuthService.isLoggedIn() ? (
                    <Component {...props} {...componentProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
    componentProps: PropTypes.object,
    location: PropTypes.string
};