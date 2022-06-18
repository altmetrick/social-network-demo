import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isAuth: state.authData.isAuth,
});

const AuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) {
        return <Navigate to="/login" />;
      }

      return <Component {...this.props} />;
    }
  }

  let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent);

  return ConnectedRedirectComponent;
};

export default AuthRedirect;
