import { profileAPI } from '../../api/api';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

const initialState = {
  posts: [
    { id: '1', text: 'My first post', likes: 1 },
    { id: '2', text: "What's up, man, today...", likes: 12 },
    { id: '3', text: 'Jack of all trades master of none', likes: 13 },
    { id: '4', text: 'Lorem ipsum Ola ', likes: 16 },
  ],
  userProfileData: null,
  userStatus: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let post = {
        id: '11',
        likes: 99,
        text: action.postText,
      };

      return {
        ...state,
        posts: [...state.posts, post],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        userProfileData: action.user,
      };

    case SET_USER_STATUS:
      return {
        ...state,
        userStatus: action.text,
      };

    default:
      return state;
  }
};

//Action Creators

export const addPostAC = (postText) => ({ type: ADD_POST, postText });

export const deletePostAC = (postId) => ({ type: DELETE_POST, postId });
//
export const setUserProfileAC = (user) => ({
  type: SET_USER_PROFILE,
  user,
});

export const setUserStatusAC = (text) => ({
  type: SET_USER_STATUS,
  text,
});

//Thunk Creators
export const getProfileThC = (userId) => {
  return (dispatch) => {
    profileAPI.getProfileData(userId).then((data) => {
      dispatch(setUserProfileAC(data));
    });
  };
};

export const getUserStatusThC = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((data) => {
      dispatch(setUserStatusAC(data));
    });
  };
};

export const updateUserStatusThC = (statusText) => {
  return (dispatch) => {
    profileAPI.updateStatus(statusText).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setUserStatusAC(statusText));
      }
    });
  };
};

export default profileReducer;
