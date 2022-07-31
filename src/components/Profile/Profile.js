import s from './Profile.module.css';

import Preloader from '../common/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div>
      <h2>Profile</h2>
      {props.userData ? (
        <ProfileInfo
          isOwner={props.isOwner}
          saveProfile={props.saveProfile}
          saveImage={props.saveImage}
          isUploading={props.isUploading}
          //
          userData={props.userData}
          userStatus={props.userStatus}
          updateUserStatus={props.updateUserStatus}
        />
      ) : (
        <Preloader />
      )}

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
