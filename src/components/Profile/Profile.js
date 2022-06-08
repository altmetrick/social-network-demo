import s from './Profile.module.css';

import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default Profile;
