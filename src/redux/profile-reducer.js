const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD_POST';

const profileReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.text;
      return state;

    case ADD_POST:
      let post = {
        id: '11',
        likes: 99,
        text: state.newPostText,
      };
      state.posts.push(post);
      state.newPostText = ' ';
      return state;

    default:
      return state;
  }
};

//Action Creators
export const updateNewPostTextAC = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
});

export const addPostAC = () => ({ type: ADD_POST });

export default profileReducer;
