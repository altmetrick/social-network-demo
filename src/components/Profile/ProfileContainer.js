import s from './Profile.module.css';
import { Component } from 'react';

import Profile from './Profile';

import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfileAC as setUserProfile } from '../../redux/reducers/profile-reducer';
import { useParams } from 'react-router-dom';

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.params.userId;

    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((res) => {
        this.props.setUserProfile(res.data);
      });
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

export default connect(mapStateToProps, { setUserProfile })(
  WithUrlParamsProfileContainer
);
