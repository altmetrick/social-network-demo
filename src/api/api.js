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
};

export const profileAPI = {
  getProfileData: (userId) => {
    return instance.get(`profile/${userId}`).then((res) => res.data);
  },
};
