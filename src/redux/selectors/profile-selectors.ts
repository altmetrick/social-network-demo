import { RootStateT } from '../redux-store';

export const getUserProfileData = (state: RootStateT) =>
  state.profilePage.userProfileData;
export const getUserStatus = (state: RootStateT) =>
  state.profilePage.userStatus;
export const getIsUploading = (state: RootStateT) =>
  state.profilePage.isUploadingImg;
