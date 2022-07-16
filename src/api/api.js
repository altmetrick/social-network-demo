import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': 'ec583d87-d3ed-4145-8d1b-a8d7cb2e61e2' },
});

export const usersAPI = {
  getUsers: (pageSize, currentPage) => {
    return instance
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((res) => res.data);
  },

  follow: (userId) => {
    return instance.post(`follow/${userId}`).then((res) => res.data);
  },

  unfollow: (userId) => {
    return instance.delete(`follow/${userId}`).then((res) => res.data);
  },
};

export const authAPI = {
  authMe: () => {
    return instance.get('auth/me').then((res) => res.data);
  },
  login: (email, password, rememberMe, captcha = null) => {
    return instance.post('auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logOut: () => {
    return instance.delete('auth/login');
  },
};

export const profileAPI = {
  getProfileData: (userId) => {
    return instance.get(`profile/${userId}`).then((res) => res.data);
  },
  getStatus: (userId) => {
    return instance.get(`profile/status/${userId}`).then((res) => res.data);
  },
  updateStatus: (statusText) => {
    return instance.put('profile/status', { status: statusText });
  },
  saveImage: (imagFile) => {
    let formData = new FormData();
    formData.append('image', imagFile);

    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile: (profileData) => {
    return instance.put('profile', profileData);
  },
};

export const securityAPI = {
  getCaptchaUrl: () => {
    return instance.get('security/get-captcha-url');
  },
};
