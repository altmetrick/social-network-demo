import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import {
  addPostAC,
  updateNewPostTextAC,
} from '../../../redux/reducers/profile-reducer';

// const MyPostsContainer = (props) => {
//   let state = props.store.getState();

//   const addPost = () => {
//     props.store.dispatch(addPostAC());
//   };

//   const onPostChange = (text) => {
//     props.store.dispatch(updateNewPostTextAC(text));
//   };

//   return (
//     <MyPosts
//       newPostText={state.profilePage.newPostText}
//       posts={state.profilePage.posts}
//       addPost={addPost}
//       onPostChange={onPostChange}
//     />
//   );
// };

const mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostAC());
    },
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextAC(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
