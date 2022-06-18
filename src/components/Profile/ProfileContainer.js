import s from './Profile.module.css';
import { Component } from 'react';

import Profile from './Profile';
import AuthRedirect from '../../hoc/AuthRedirect';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getProfileThC as getProfile,
  getUserStatusThC as getUserStatus,
  updateUserStatusThC as updateUserStatus,
} from '../../redux/reducers/profile-reducer';

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.params.userId;

    this.props.getProfile(userId);

    setTimeout(() => {
      this.props.getUserStatus(userId);
    }, 1000);
    //this.props.getUserStatus(userId);
  }

  render() {
    return (
      <Profile
        userData={this.props.userData}
        userStatus={this.props.userStatus}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

let WithUrlParamsProfileContainer = (props) => {
  let params = useParams();

  return <ProfileContainer {...props} params={params} />;
};

const mapStateToProps = (state) => ({
  userData: state.profilePage.userProfileData,
  userStatus: state.profilePage.userStatus,
});

export default compose(
  connect(mapStateToProps, { getProfile, getUserStatus, updateUserStatus })
  // AuthRedirect
)(WithUrlParamsProfileContainer);
