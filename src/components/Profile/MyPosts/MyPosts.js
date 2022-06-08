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
        <Posts message="hello" />
        <Posts message="How are you?" />
        <Posts message="Hello world" />
      </div>
    </div>
  );
};

export default MyPosts;
