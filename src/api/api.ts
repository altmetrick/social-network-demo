import axios from 'axios';
import { PhotosT, ProfileDataT, UserT } from '../types/types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': 'ec583d87-d3ed-4145-8d1b-a8d7cb2e61e2' },
});

//enums for result code
export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeWithCaptchaEnum {
  CaptchaIsRequired = 10,
}

//usersAPI types
type GetUsersResType = {
  items: Array<UserT>;
  totalCount: number;
  error: string | null;
};

type FollowResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string> | null;
  data: any;
};
type UnfollowResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string> | null;
  data: any;
};

export const usersAPI = {
  getUsers: (pageSize: number, currentPage: number) => {
    return instance
      .get<GetUsersResType>(`users?count=${pageSize}&page=${currentPage}`)
      .then((res) => res.data);
  },

  follow: (userId: number) => {
    return instance
      .post<FollowResType>(`follow/${userId}`)
      .then((res) => res.data);
  },

  unfollow: (userId: number) => {
    return instance
      .delete<UnfollowResType>(`follow/${userId}`)
      .then((res) => res.data);
  },
};

//authAPI types
type authMeData = {
  id: number;
  email: string;
  login: string;
};

type AuthMeResType = {
  resultCode: number;
  messages: Array<string>;
  data: authMeData;
};

type LoginResType = {
  resultCode: ResultCodeEnum | ResultCodeWithCaptchaEnum;
  messages: Array<string>;
  data: any;
};

type LogOutResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: any;
};

export const authAPI = {
  authMe: () => {
    return instance.get<AuthMeResType>('auth/me').then((res) => res.data);
  },
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null = null
  ) => {
    return instance
      .post<LoginResType>('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logOut: () => {
    return instance.delete<LogOutResType>('auth/login').then((res) => res.data);
  },
};

//profileAPI types

type UpdateStatusResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: any;
};

type SaveImageResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: {
    photos: PhotosT;
  };
};

type SaveProfileResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: any;
};

export const profileAPI = {
  getProfileData: (userId: number) => {
    return instance
      .get<ProfileDataT>(`profile/${userId}`)
      .then((res) => res.data);
  },
  getStatus: (userId: number) => {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((res) => res.data);
  },
  updateStatus: (statusText: string) => {
    return instance
      .put<UpdateStatusResType>('profile/status', {
        status: statusText,
      })
      .then((res) => res.data);
  },
  saveImage: (imagFile: any) => {
    let formData = new FormData();
    formData.append('image', imagFile);

    return instance
      .put<SaveImageResType>('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data);
  },
  saveProfile: (profileData: ProfileDataT) => {
    return instance
      .put<SaveProfileResType>('profile', profileData)
      .then((res) => res.data);
  },
};

export const securityAPI = {
  getCaptchaUrl: () => {
    return instance.get('security/get-captcha-url');
  },
};
