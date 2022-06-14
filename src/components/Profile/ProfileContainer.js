import s from './Profile.module.css';
import { Component } from 'react';

import Profile from './Profile';

import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfileAC as setUserProfile } from '../../redux/reducers/profile-reducer';

class ProfileContainer extends Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${15}`)
      .then((res) => {
        this.props.setUserProfile(res.data);
      });
  }

  render() {
    return <Profile userData={this.props.userData} />;
  }
}

const mapStateToProps = (state) => ({
  userData: state.profilePage.userProfileData,
});

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
