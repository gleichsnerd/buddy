import React from "react";
import PropTypes from "prop-types";
import {
    Route
} from "react-router-dom";

export default function PublicPrivateRoute({ 
    isLoggedIn,
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
                isLoggedIn ? (
                    <PrivateComponent {...props} {...(privateComponentProps || {})} />
                ) : (
                    <PublicComponent {...props} {...(publicComponentProps || {})} />     
                )
            }
        />
    );
}

PublicPrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool,
    publicComponent: PropTypes.func,
    privateComponent: PropTypes.func,
    publicComponentProps: PropTypes.object,
    privateComponentProps: PropTypes.object,
};