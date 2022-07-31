import s from './ProfileInfo.module.css';
import defPhoto from './../../../assets/images/User_default_avatar.png';

import { useState } from 'react';

import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);

  const onImageChange = (e) => {
    const imageFile = e.target.files[0];
    props.saveImage(imageFile);
  };

  const onFormSubmit = (formData) => {
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
            userData={props.userData}
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
