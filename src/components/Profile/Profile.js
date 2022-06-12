import s from './Profile.module.css';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      <h2>Profile</h2>
      <ProfileInfo />

      <MyPostsContainer store={props.store} />
    </div>
  );
};

export default Profile;
