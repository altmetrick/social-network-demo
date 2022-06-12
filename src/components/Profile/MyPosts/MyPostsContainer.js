import MyPosts from './MyPosts';

import {
  addPostAC,
  updateNewPostTextAC,
} from '../../../redux/reducers/profile-reducer';

const MyPostsContainer = (props) => {
  let state = props.store.getState();

  const addPost = () => {
    props.store.dispatch(addPostAC());
  };

  const onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextAC(text));
  };

  return (
    <MyPosts
      newPostText={state.profilePage.newPostText}
      posts={state.profilePage.posts}
      addPost={addPost}
      onPostChange={onPostChange}
    />
  );
};

export default MyPostsContainer;
