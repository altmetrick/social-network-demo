import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { addPostAC } from '../../../redux/reducers/profile-reducer.ts';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postText) => {
      dispatch(addPostAC(postText));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
