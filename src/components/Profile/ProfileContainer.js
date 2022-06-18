import s from './Profile.module.css';
import { Component } from 'react';

import Profile from './Profile';
import AuthRedirect from '../../hoc/AuthRedirect';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileThC as getProfile } from '../../redux/reducers/profile-reducer';

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.params.userId;

    this.props.getProfile(userId);
  }

  render() {
    return <Profile userData={this.props.userData} />;
  }
}

let WithUrlParamsProfileContainer = (props) => {
  let params = useParams();

  return <ProfileContainer {...props} params={params} />;
};

const mapStateToProps = (state) => ({
  userData: state.profilePage.userProfileData,
});

export default compose(
  connect(mapStateToProps, { getProfile }),
  AuthRedirect
)(WithUrlParamsProfileContainer);
