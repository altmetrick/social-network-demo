import s from './Profile.module.css';

import Preloader from '../common/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import React, { FunctionComponent } from 'react';
import { ProfileDataT } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';

import {
  getIsUploading,
  getUserProfileData,
  getUserStatus,
} from '../../redux/selectors/profile-selectors';

import {
  saveImageThC,
  saveProfileThC,
  updateUserStatusThC,
} from '../../redux/reducers/profile-reducer';

type PropsT = {
  isOwner: boolean;
};

const Profile: FunctionComponent<PropsT> = (props) => {
  const dispatch = useDispatch();

  const isUploading = useSelector(getIsUploading);
  const userData = useSelector(getUserProfileData);
  const userStatus = useSelector(getUserStatus);

  const saveProfile = (profileData: ProfileDataT) => {
    return dispatch<any>(saveProfileThC(profileData));
  };
  const saveImage = (imageFile: File) => {
    dispatch<any>(saveImageThC(imageFile));
  };
  const updateUserStatus = (statusText: string) => {
    dispatch<any>(updateUserStatusThC(statusText));
  };

  return (
    <div>
      <h2>Profile</h2>
      {userData ? (
        <ProfileInfo
          isOwner={props.isOwner}
          saveProfile={saveProfile}
          saveImage={saveImage}
          isUploading={isUploading}
          //
          userData={userData as ProfileDataT}
          userStatus={userStatus}
          updateUserStatus={updateUserStatus}
        />
      ) : (
        <Preloader />
      )}

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
