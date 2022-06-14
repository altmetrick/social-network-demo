import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import {
  addPostAC,
  updateNewPostTextAC,
} from '../../../redux/reducers/profile-reducer';

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
