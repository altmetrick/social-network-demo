import s from './Profile.module.css';

import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      <h2>Profile</h2>
      <ProfileInfo />

      <MyPosts
        newPostText={props.state.newPostText}
        posts={props.state.posts}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
      />
    </div>
  );
};

export default Profile;
