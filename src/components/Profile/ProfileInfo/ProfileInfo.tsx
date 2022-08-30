import s from './ProfileInfo.module.css';

import defPhoto from './../../../assets/images/User_default_avatar.png';

import React, { useState, FunctionComponent, ChangeEvent } from 'react';

import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm, {
  PforileFormDataT,
} from './ProfileDataForm/ProfileDataForm';
import { ProfileDataT } from '../../../types/types';

type PropsT = {
  isOwner: boolean;
  saveImage: (imageFile: File) => (dispatch: any) => Promise<void>;
  saveProfile: (profileData: ProfileDataT) => Promise<any>;
  isUploading: boolean;

  userData: ProfileDataT;
  userStatus: string;
  updateUserStatus: (statusText: string) => (dispatch: any) => Promise<void>;
};

const ProfileInfo: FunctionComponent<PropsT> = (props) => {
  const [editMode, setEditMode] = useState(false);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.saveImage(e.target.files[0]);
    }
  };

  const onFormSubmit = (formData: ProfileDataT) => {
    //todo: remove then
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={s.profileInfoWrapper}>
      <h3>Profile Info</h3>

      <div className={s.imageBlock}>
        {props.isUploading ? (
          <Preloader />
        ) : (
          <div className={s.imageWrapper}>
            <img
              className={s.mainPhoto}
              src={props.userData.photos.large || defPhoto}
            />
            {props.isOwner && (
              <label htmlFor="chooseImg" className={s.selectImgBtn}>
                Select Image
                <input
                  id="chooseImg"
                  type="file"
                  onChange={onImageChange}
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                />
              </label>
            )}
          </div>
        )}
      </div>

      <div className={s.descriptionBlock}>
        <div>
          <h4>{props.userData.fullName}</h4>
        </div>

        <ProfileStatus
          isOwner={props.isOwner}
          userStatus={props.userStatus}
          updateUserStatus={props.updateUserStatus}
        />

        <div>User Id: {props.userData.userId}</div>

        {props.isOwner && !editMode && (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}

        {editMode ? (
          <ProfileDataForm
            initialValues={props.userData}
            onSubmit={onFormSubmit}
          />
        ) : (
          <ProfileData userData={props.userData} />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
