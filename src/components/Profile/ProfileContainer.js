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
  saveImageThC as saveImage,
  saveProfileThC as saveProfile,
} from '../../redux/reducers/profile-reducer';

class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.params.userId;

    if (userId === 'myProfile') {
      userId = this.props.authUserId;
    }

    if (userId) {
      this.props.getProfile(userId);

      this.props.getUserStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('profile comp did upd');
    if (prevProps.params.userId !== this.props.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        isOwner={
          (this.props.authUserId && this.props.params.userId === 'myProfile') ||
          (this.props.authUserId &&
            this.props.params.userId == this.props.authUserId)
            ? true
            : false
        }
        saveProfile={this.props.saveProfile}
        saveImage={this.props.saveImage}
        isUploading={this.props.isUploading}
        //
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

const mapStateToProps = (state) => {
  return {
    userData: state.profilePage.userProfileData,
    userStatus: state.profilePage.userStatus,
    isUploading: state.profilePage.isUploadingImg,
    authUserId: state.authData.userId,
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getUserStatus,
    updateUserStatus,
    saveImage,
    saveProfile,
  })
  //AuthRedirect
)(WithUrlParamsProfileContainer);
