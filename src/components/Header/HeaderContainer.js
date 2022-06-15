import { Component } from 'react';

import Header from './Header';

import axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserDataAC as setAuthUserData } from '../../redux/reducers/auth-reducer';

class HeaderContainer extends Component {
  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          let { id, email, login } = res.data.data;
          this.props.setAuthUserData(id, email, login);
        }
      });
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

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);
