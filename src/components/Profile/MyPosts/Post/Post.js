import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <div>
        <img src="https://thumbs.dreamstime.com/b/avatar-icon-black-round-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-avatar-abstract-icon-black-vector-124920467.jpg" />
      </div>
      <div>
        {props.message}
        <div>likes: {props.likes}</div>
      </div>
    </div>
  );
};

export default Post;
