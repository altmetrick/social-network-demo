import { profileAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { matchKeysToMessages } from '../../utilities/helpers/helpers';
import { ContactsT, PhotosT, PostT, ProfileDataT } from '../../types/types';
import { ThunkAction } from 'redux-thunk';
import { RootStateT } from '../redux-store';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_PROFILE_DATA = 'profile/SET_PROFILE_DATA';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SAVE_IMAGE_SUCCESS = 'profile/SAVE_IMAGE_SUCCESS';
const TOGGLE_IS_UPLOADING_IMG = 'profile/TOGGLE_IS_UPLOADING_IMG';

const initialState = {
  posts: [
    { id: '1', text: 'My first post', likes: 1 },
    { id: '2', text: "What's up, man, today...", likes: 12 },
    { id: '3', text: 'Jack of all trades master of none', likes: 13 },
    { id: '4', text: 'Lorem ipsum Ola ', likes: 16 },
  ] as Array<PostT>,
  userProfileData: null as ProfileDataT | null,
  userStatus: '',
  isUploadingImg: false,
};

type StateT = typeof initialState;

const profileReducer = (state = initialState, action: ActionType): StateT => {
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
        posts: state.posts.filter((post) => Number(post.id) !== action.postId),
      };

    case SET_PROFILE_DATA:
      return {
        ...state,
        userProfileData: action.profileData,
      };

    case SET_USER_STATUS:
      return {
        ...state,
        userStatus: action.text,
      };

    case SAVE_IMAGE_SUCCESS:
      return {
        ...state,
        userProfileData: {
          ...state.userProfileData,
          photos: action.photosUrl,
        } as ProfileDataT,
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
type ActionType =
  | AddPostAT
  | DeletePostAT
  | SetProfileDataAT
  | SetUserStatusAT
  | SaveImageSuccessAT
  | ToggleIsUploadingImgAT;

type AddPostAT = {
  type: typeof ADD_POST;
  postText: string;
};
export const addPostAC = (postText: string): AddPostAT => ({
  type: ADD_POST,
  postText,
});

type DeletePostAT = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePostAC = (postId: number): DeletePostAT => ({
  type: DELETE_POST,
  postId,
});
//
type SetProfileDataAT = {
  type: typeof SET_PROFILE_DATA;
  profileData: ProfileDataT;
};
export const setProfileDataAC = (
  profileData: ProfileDataT
): SetProfileDataAT => ({
  type: SET_PROFILE_DATA,
  profileData,
});

type SetUserStatusAT = {
  type: typeof SET_USER_STATUS;
  text: string;
};
export const setUserStatusAC = (text: string): SetUserStatusAT => ({
  type: SET_USER_STATUS,
  text,
});

type SaveImageSuccessAT = {
  type: typeof SAVE_IMAGE_SUCCESS;
  photosUrl: PhotosT;
};
export const saveImageSuccessAC = (photosUrl: any): SaveImageSuccessAT => ({
  type: SAVE_IMAGE_SUCCESS,
  photosUrl,
});

type ToggleIsUploadingImgAT = {
  type: typeof TOGGLE_IS_UPLOADING_IMG;
  isUploading: boolean;
};
export const toggleIsUploadingImgAC = (
  isUploading: boolean
): ToggleIsUploadingImgAT => ({
  type: TOGGLE_IS_UPLOADING_IMG,
  isUploading,
});

//Thunk Creators
type ThunkType = ThunkAction<Promise<void>, RootStateT, unknown, ActionType>;

export const getProfileThC = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getProfileData(userId);

    dispatch(setProfileDataAC(data));
  };
};

export const getUserStatusThC = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(setUserStatusAC(data));
  };
};

export const updateUserStatusThC = (statusText: string): ThunkType => {
  return async (dispatch) => {
    try {
      let res = await profileAPI.updateStatus(statusText);

      if (res.data.resultCode === 0) {
        dispatch(setUserStatusAC(statusText));
      }
    } catch (error) {
      console.log('Error');
    }
  };
};

export const saveImageThC = (imageFile): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsUploadingImgAC(true));
    let res = await profileAPI.saveImage(imageFile);

    if (res.data.resultCode === 0) {
      dispatch(saveImageSuccessAC(res.data.data.photos));
    }
    dispatch(toggleIsUploadingImgAC(false));
  };
};

export const saveProfileThC = (profileData: ProfileDataT): ThunkType => {
  return async (dispatch, getState) => {
    const res = await profileAPI.saveProfile(profileData);

    const state = getState();
    //@ts-ignore
    const contacts = state.profilePage.userProfileData.contacts;

    if (res.data.resultCode === 0) {
      //@ts-ignore
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
