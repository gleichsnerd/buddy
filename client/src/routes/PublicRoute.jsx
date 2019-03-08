import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export default function PublicRoute({ component: Component, componentProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                <Component {...props} {...componentProps} />
            }
        />
    );
}

PublicRoute.propTypes = {
    component: PropTypes.func,
    componentProps: PropTypes.object,
    location: PropTypes.string
};