import s from './Profile.module.css';

import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <div>Image</div>
      <div>Ava description</div>
      <MyPosts />
    </div>
  );
};

export default Profile;
