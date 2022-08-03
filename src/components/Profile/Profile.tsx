import s from './Profile.module.css';

import Preloader from '../common/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import React, { FunctionComponent } from 'react';
import { ProfileDataT } from '../../types/types';

type PropsT = {
  isOwner: boolean;
  saveImage: (imageFile: any) => (dispatch: any) => Promise<void>;
  saveProfile: (
    profileData: ProfileDataT
  ) => (dispatch: any, getState: any) => Promise<undefined>;
  isUploading: boolean;

  userData: ProfileDataT;
  userStatus: string;
  updateUserStatus: (statusText: string) => (dispatch: any) => Promise<void>;
};

const Profile: FunctionComponent<PropsT> = (props) => {
  return (
    <div>
      <h2>Profile</h2>
      {props.userData ? (
        <ProfileInfo
          isOwner={props.isOwner}
          saveProfile={props.saveProfile}
          saveImage={props.saveImage}
          isUploading={props.isUploading}
          //
          userData={props.userData}
          userStatus={props.userStatus}
          updateUserStatus={props.updateUserStatus}
        />
      ) : (
        <Preloader />
      )}

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
