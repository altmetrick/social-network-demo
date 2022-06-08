import s from './MyPosts.module.css';
import Post from './Post/Post';
import { createRef } from 'react';

import { addPost } from '../../../redux/state';

const MyPosts = (props) => {
  const postsEls = props.posts.map((p) => (
    <Post id={p.id} message={p.text} likes={p.likes} />
  ));

  const newPostElement = createRef();

  const onButtonClick = () => {
    let text = newPostElement.current.value;
    addPost(text);
  };

  return (
    <div className={s.myPostsWrapper}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} />
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
