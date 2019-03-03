import React from 'react';
import AuthService from '../services/AuthService';
import {
    Route,
    Redirect
} from 'react-router-dom'

export default function authRequired(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isLoggedIn: AuthService.isLoggedIn()};
    }
    
    render() {
      return (
        <Route render={props => (
          this.state.isLoggedIn ? (
            <WrappedComponent {...props} />
          ) : (
            <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          )
        )} />
      );
    }
  };       
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         fakeAuth.isAuthenticated ? (
//             <Component {...props} />
//         ) : (
//                 <Redirect to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }} />
//             )
//     )} />
// )