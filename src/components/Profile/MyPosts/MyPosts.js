import s from './MyPosts.module.css';
import Posts from './Post/Post';

const MyPosts = () => {
  return (
    <div className={s.myPostsWrapper}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea />
        </div>
        <div>
          <button>Add Post</button>
        </div>
      </div>

      <div className={s.postsBlock}>
        <h4>Posts:</h4>

        <Posts message="hello" />
        <Posts message="How are you?" />
        <Posts message="Hello world" />
      </div>
    </div>
  );
};

export default MyPosts;
