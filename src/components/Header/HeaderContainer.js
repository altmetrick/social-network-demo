import { Component } from 'react';

import Header from './Header';

import { connect } from 'react-redux';
import {
  authMeThC as authMe,
  logOutThC as logOut,
} from '../../redux/reducers/auth-reducer';

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.authMe();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  userId: state.authData.userId,
  email: state.authData.email,
  login: state.authData.login,
  isAuth: state.authData.isAuth,
});

export default connect(mapStateToProps, { authMe, logOut })(HeaderContainer);
