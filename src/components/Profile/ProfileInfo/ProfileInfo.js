import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div className={s.profileInfoWrapper}>
      <h3>Profile Info</h3>
      <div>
        <div>Image</div>
        <div className={s.descriptionBlock}>
          <div>Ava</div>
          <div>Description</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
