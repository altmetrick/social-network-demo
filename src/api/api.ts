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

//General types

type ResponseT<DataT = {}, RC = ResultCodeEnum> = {
  data: DataT;
  messages: Array<string>;
  resultCode: RC;
};

//usersAPI types
type GetUsersResType = {
  items: Array<UserT>;
  totalCount: number;
  error: string | null;
};

export type FollowResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string> | null;
  data: {};
};
type UnfollowResType = {
  resultCode: ResultCodeEnum;
  messages: Array<string> | null;
  data: {};
};

export const usersAPI = {
  getUsers: (pageSize: number, currentPage: number, term: string = '') => {
    return instance
      .get<GetUsersResType>(
        `users?count=${pageSize}&page=${currentPage}&term=${term}`
      )
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
type AuthMeData = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  authMe: () => {
    return instance
      .get<ResponseT<AuthMeData>>('auth/me')
      .then((res) => res.data);
  },
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null = null
  ) => {
    return instance
      .post<ResponseT<{}, ResultCodeEnum | ResultCodeWithCaptchaEnum>>(
        'auth/login',
        {
          email,
          password,
          rememberMe,
          captcha,
        }
      )
      .then((res) => res.data);
  },
  logOut: () => {
    return instance.delete<ResponseT>('auth/login').then((res) => res.data);
  },
};

//profileAPI types
type SaveImageResDataT = {
  photos: PhotosT;
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
      .put<ResponseT>('profile/status', {
        status: statusText,
      })
      .then((res) => res.data);
  },
  saveImage: (imagFile: any) => {
    let formData = new FormData();
    formData.append('image', imagFile);

    return instance
      .put<ResponseT<SaveImageResDataT>>('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data);
  },
  saveProfile: (profileData: Omit<ProfileDataT, 'userId'>) => {
    return instance
      .put<ResponseT>('profile', profileData)
      .then((res) => res.data);
  },
};

type GetCaptchaUrlT = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl: () => {
    return instance
      .get<GetCaptchaUrlT>('security/get-captcha-url')
      .then((res) => res.data);
  },
};
