import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div className={s.profileInfoWrapper}>
      <h3>Profile Info</h3>
      <div>
        <div>
          <img src={props.userData.photos.large} />
        </div>

        <div className={s.descriptionBlock}>
          <div>
            <h4>{props.userData.fullName}</h4>
          </div>
          <div>{props.userData.aboutMe}</div>
          <div>User Id: {props.userData.userId}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
