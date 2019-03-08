import React from "react";
import PropTypes from "prop-types";
import AuthService from "../services/AuthService";
import {
    Route
} from "react-router-dom";

export default function PublicPrivateRoute({ 
    publicComponent: PublicComponent,
    publicComponentProps,
    privateComponent: PrivateComponent,
    privateComponentProps,
    ...rest }) 
{  
    return (
        <Route
            {...rest}
            render={props =>
                AuthService.isLoggedIn() ? (
                    <PrivateComponent {...props} {...(privateComponentProps || {})} />
                ) : (
                    <PublicComponent {...props} {...(publicComponentProps || {})} />     
                )
            }
        />
    );
}

PublicPrivateRoute.propTypes = {
    publicComponent: PropTypes.func,
    privateComponent: PropTypes.func,
    publicComponentProps: PropTypes.object,
    privateComponentProps: PropTypes.object,
};