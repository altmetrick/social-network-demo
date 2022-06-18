import s from './Profile.module.css';
import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './Profile';
import AuthRedirect from '../../hoc/AuthRedirect';

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

const WithAuthRedirectComponent = AuthRedirect(WithUrlParamsProfileContainer);

const mapStateToProps = (state) => ({
  userData: state.profilePage.userProfileData,
});

export default connect(mapStateToProps, { getProfile })(
  WithAuthRedirectComponent
);
