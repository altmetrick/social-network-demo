import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducers/profile-reducer.ts';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postText) => {
      dispatch(actions.addPostAC(postText));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
