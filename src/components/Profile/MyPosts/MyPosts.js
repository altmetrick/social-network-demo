import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm, reset } from 'redux-form';

import { maxLength } from '../../../utilities/validators/validators';

import { FormControlWithInputTag } from '../../common/FormControls/FormControls';

const maxLength10 = maxLength(10);

let AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[maxLength10]}
          name="newPostText"
          component={FormControlWithInputTag}
          inputTag="textarea"
          type="text"
          placeholder="Write your post"
        />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  );
};

AddPostForm = reduxForm({
  form: 'profileAddPostForm',
})(AddPostForm);

const MyPosts = (props) => {
  const postsEls = props.posts.map((p) => (
    <Post key={p.id} id={p.id} message={p.text} likes={p.likes} />
  ));

  const submit = (values, dispatch) => {
    console.log(values);
    props.addPost(values.newPostText);

    dispatch(reset('profileAddPostForm'));
  };

  return (
    <div className={s.myPostsWrapper}>
      <h3>My Posts</h3>
      <div>
        <AddPostForm onSubmit={submit} />
      </div>

      <div className={s.postsBlock}>
        <h4>Posts:</h4>

        {postsEls}
      </div>
    </div>
  );
};

export default MyPosts;
