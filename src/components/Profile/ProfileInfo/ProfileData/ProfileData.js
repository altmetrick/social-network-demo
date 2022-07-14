import s from './../ProfileInfo.module.css';

const ProfileData = (props) => {
  const { userData } = props;

  return (
    <div>
      <div>Full Name: {userData.fullName}</div>
      <div>About Me: {userData.aboutMe}</div>
      <div>
        Looking for a job:{' '}
        <input type="checkbox" checked={userData.lookingForAJob} readOnly />
      </div>
      <div>Skills : {userData.lookingForAJobDescription}</div>
      <div className={s.contacts}>
        <h3>Contacts</h3>
        {Object.keys(userData.contacts).map((key) => {
          return (
            <div key={key}>
              {key} : {userData.contacts[key]}{' '}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileData;
