import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducers/profile-reducer';
import { RootStateT } from '../../../redux/redux-store';

const mapStateToProps = (state: RootStateT) => {
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
