import { profileAPI } from '../../api/api';

const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

const initialState = {
  newPostText: 'Initial text',
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
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.text,
      };

    case ADD_POST:
      let post = {
        id: '11',
        likes: 99,
        text: state.newPostText,
      };

      return {
        ...state,
        posts: [...state.posts, post],
        newPostText: ' ',
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

export const updateNewPostTextAC = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
});

export const addPostAC = () => ({ type: ADD_POST });
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
