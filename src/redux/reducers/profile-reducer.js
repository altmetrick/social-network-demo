import { profileAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { matchKeysToMessages } from '../../utilities/helpers/helpers';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SAVE_IMAGE_SUCCESS = 'profile/SAVE_IMAGE_SUCCESS';
const TOGGLE_IS_UPLOADING_IMG = 'profile/TOGGLE_IS_UPLOADING_IMG';

const initialState = {
  posts: [
    { id: '1', text: 'My first post', likes: 1 },
    { id: '2', text: "What's up, man, today...", likes: 12 },
    { id: '3', text: 'Jack of all trades master of none', likes: 13 },
    { id: '4', text: 'Lorem ipsum Ola ', likes: 16 },
  ],
  userProfileData: null,
  userStatus: '',
  isUploadingImg: false,
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

    case SAVE_IMAGE_SUCCESS:
      return {
        ...state,
        userProfileData: { ...state.userProfileData, photos: action.photosUrl },
      };

    case TOGGLE_IS_UPLOADING_IMG:
      return {
        ...state,
        isUploadingImg: action.isUploading,
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

export const saveImageSuccessAC = (photosUrl) => ({
  type: SAVE_IMAGE_SUCCESS,
  photosUrl,
});

export const toggleIsUploadingImgAC = (isUploading) => ({
  type: TOGGLE_IS_UPLOADING_IMG,
  isUploading,
});

//Thunk Creators
export const getProfileThC = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getProfileData(userId);

    dispatch(setUserProfileAC(data));
  };
};

export const getUserStatusThC = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(setUserStatusAC(data));
  };
};

export const updateUserStatusThC = (statusText) => {
  return async (dispatch) => {
    let res = await profileAPI.updateStatus(statusText);

    if (res.data.resultCode === 0) {
      dispatch(setUserStatusAC(statusText));
    }
  };
};

export const saveImageThC = (imageFile) => {
  return async (dispatch) => {
    dispatch(toggleIsUploadingImgAC(true));
    let res = await profileAPI.saveImage(imageFile);

    if (res.data.resultCode === 0) {
      dispatch(saveImageSuccessAC(res.data.data.photos));
    }
    dispatch(toggleIsUploadingImgAC(false));
  };
};

export const saveProfileThC = (profileData) => {
  return async (dispatch, getState) => {
    const res = await profileAPI.saveProfile(profileData);

    const state = getState();
    const contacts = state.profilePage.userProfileData.contacts;

    if (res.data.resultCode === 0) {
      dispatch(getProfileThC(state.authData.userId));
    } else {
      let action = stopSubmit('profileDataForm', {
        contacts: matchKeysToMessages(contacts, res.data.messages),
        //_error: 'Invalid links',
      });
      dispatch(action);
      return Promise.reject('Invalid fields data');
    }
  };
};

export default profileReducer;
