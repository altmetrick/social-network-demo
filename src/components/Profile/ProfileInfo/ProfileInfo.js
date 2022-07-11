import s from './ProfileInfo.module.css';
import defPhoto from './../../../assets/images/User_default_avatar.png';

import ProfileStatus from './ProfileStatus/ProfileStatus';

const ProfileInfo = (props) => {
  return (
    <div className={s.profileInfoWrapper}>
      <h3>Profile Info</h3>
      <div>
        <div>
          <img
            className={s.mainPhoto}
            src={`${
              props.userData.photos.large
                ? props.userData.photos.large
                : defPhoto
            }`}
          />
        </div>

        <div className={s.descriptionBlock}>
          <div>
            <h4>{props.userData.fullName}</h4>
          </div>
          <ProfileStatus
            userStatus={props.userStatus}
            updateUserStatus={props.updateUserStatus}
          />
          <div>{props.userData.aboutMe}</div>
          <div>User Id: {props.userData.userId}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
