import s from './MyPosts.module.css';
import Posts from './Post/Post';

const MyPosts = () => {
  return (
    <div>
      <h2>My Posts</h2>

      <textarea />
      <div>
        <button>Add Post</button>
      </div>
      <br />

      <div>
        New Post
        <Posts />
        <Posts />
        <Posts />
      </div>
    </div>
  );
};

export default MyPosts;
