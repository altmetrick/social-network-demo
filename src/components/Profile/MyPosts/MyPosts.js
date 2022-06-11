import s from './MyPosts.module.css';
import Post from './Post/Post';

import {
  addPostAC,
  updateNewPostTextAC,
} from '../../../redux/reducers/profile-reducer';

const MyPosts = (props) => {
  const postsEls = props.posts.map((p) => (
    <Post id={p.id} message={p.text} likes={p.likes} />
  ));

  const onButtonClick = () => {
    props.dispatch(addPostAC());
  };

  const onTextareaChange = (e) => {
    let text = e.target.value;

    props.dispatch(updateNewPostTextAC(text));
  };

  return (
    <div className={s.myPostsWrapper}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea onChange={onTextareaChange} value={props.newPostText} />
        </div>
        <div>
          <button onClick={onButtonClick}>Add Post</button>
        </div>
      </div>

      <div className={s.postsBlock}>
        <h4>Posts:</h4>

        {postsEls}
      </div>
    </div>
  );
};

export default MyPosts;
