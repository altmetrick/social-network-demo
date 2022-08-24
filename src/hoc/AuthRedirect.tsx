import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateT } from '../redux/redux-store';

type MapStatePropsT = { isAuth: boolean };
type MapDispatchPropsT = {};

const mapStateToProps = (state: RootStateT) => ({
  isAuth: state.authData.isAuth,
});

const AuthRedirect = <CP,>(Component: React.ComponentType<CP>) => {
  const RedirectComponent: FunctionComponent<
    MapDispatchPropsT & MapStatePropsT
  > = (props) => {
    const { isAuth, ...restProps } = props;

    if (!props.isAuth) {
      return <Navigate to="/login" />;
    }
    return <Component {...(restProps as unknown as CP)} />;
  };

  let ConnectedRedirectComponent = connect<
    MapStatePropsT,
    MapDispatchPropsT,
    CP,
    RootStateT
  >(mapStateToProps)(RedirectComponent);

  return ConnectedRedirectComponent;
};

export default AuthRedirect;
