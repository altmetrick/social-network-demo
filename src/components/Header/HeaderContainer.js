import { Component } from 'react';

import Header from './Header';

import { connect } from 'react-redux';
import { logOutThC as logOut } from '../../redux/reducers/auth-reducer.ts';

class HeaderContainer extends Component {
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

export default connect(mapStateToProps, { logOut })(HeaderContainer);
