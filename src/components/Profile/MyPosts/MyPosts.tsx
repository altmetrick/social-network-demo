import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';

import { maxLength } from '../../../utilities/validators/validators';

import { FormControlWithInputTag } from '../../common/FormControls/FormControls';
import React, { FunctionComponent } from 'react';
import { PostT } from '../../../types/types';

const maxLength10 = maxLength(10);

type FormDataT = {
  newPostText: string;
};
type OwnFormPropsT = {};

const AddPostForm: FunctionComponent<
  InjectedFormProps<FormDataT, OwnFormPropsT> & OwnFormPropsT
> = (props) => {
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

const AddPostFormRedux = reduxForm<FormDataT, OwnFormPropsT>({
  form: 'profileAddPostForm',
})(AddPostForm);

////

type PropsT = {
  posts: Array<PostT>;
  addPost: (postText: string) => void;
};

const MyPosts: FunctionComponent<PropsT> = (props) => {
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
        <AddPostFormRedux onSubmit={submit} />
      </div>

      <div className={s.postsBlock}>
        <h4>Posts:</h4>

        {postsEls}
      </div>
    </div>
  );
};

export default MyPosts;
