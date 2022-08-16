import { profileAPI, ResultCodeEnum } from '../../api/api';
import { stopSubmit, FormAction } from 'redux-form';
import { matchKeysToMessages } from '../../utilities/helpers/helpers';
import { ContactsT, PhotosT, PostT, ProfileDataT } from '../../types/types';
import { ThunkAction } from 'redux-thunk';
import { InferActionTypes, RootStateT } from '../redux-store';

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
type ActionType = InferActionTypes<typeof actions>;

export const actions = {
  addPostAC: (postText: string) =>
    ({
      type: ADD_POST,
      postText,
    } as const),

  deletePostAC: (postId: number) =>
    ({
      type: DELETE_POST,
      postId,
    } as const),

  setProfileDataAC: (profileData: ProfileDataT) =>
    ({
      type: SET_PROFILE_DATA,
      profileData,
    } as const),

  setUserStatusAC: (text: string) =>
    ({
      type: SET_USER_STATUS,
      text,
    } as const),

  saveImageSuccessAC: (photosUrl: any) =>
    ({
      type: SAVE_IMAGE_SUCCESS,
      photosUrl,
    } as const),

  toggleIsUploadingImgAC: (isUploading: boolean) =>
    ({
      type: TOGGLE_IS_UPLOADING_IMG,
      isUploading,
    } as const),
};
//Thunk Creators
type ThunkType = ThunkAction<
  Promise<void>,
  RootStateT,
  unknown,
  ActionType | FormAction
>;

export const getProfileThC = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getProfileData(userId);

    dispatch(actions.setProfileDataAC(data));
  };
};

export const getUserStatusThC = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);

    dispatch(actions.setUserStatusAC(data));
  };
};

export const updateUserStatusThC = (statusText: string): ThunkType => {
  return async (dispatch) => {
    try {
      let data = await profileAPI.updateStatus(statusText);

      if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserStatusAC(statusText));
      }
    } catch (error) {
      console.log('Error');
    }
  };
};

export const saveImageThC = (imageFile): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsUploadingImgAC(true));
    let data = await profileAPI.saveImage(imageFile);

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.saveImageSuccessAC(data.data.photos));
    }
    dispatch(actions.toggleIsUploadingImgAC(false));
  };
};

export const saveProfileThC = (profileData: ProfileDataT): ThunkType => {
  return async (dispatch, getState) => {
    const data = await profileAPI.saveProfile(profileData);

    const state = getState();

    if (data.resultCode === ResultCodeEnum.Success) {
      //@ts-ignore
      dispatch(getProfileThC(state.authData.userId));
    } else {
      //@ts-ignore
      const contacts = state.profilePage.userProfileData.contacts;

      let action = stopSubmit('profileDataForm', {
        contacts: matchKeysToMessages(contacts, data.messages),
        //_error: 'Invalid links',
      });
      dispatch(action);
      return Promise.reject('Invalid fields data');
    }
  };
};

export default profileReducer;
