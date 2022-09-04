import { RootStateT } from '../redux-store';

export const getUsers = (state: RootStateT) => state.usersPage.users;

export const getTotalUsersCount = (state: RootStateT) =>
  state.usersPage.totalUsersCount;

export const getPageSize = (state: RootStateT) => state.usersPage.pageSize;

export const getCurrentPage = (state: RootStateT) =>
  state.usersPage.currentPage;

export const getIsFetching = (state: RootStateT) => state.usersPage.isFetching;

export const getFollowingProgress = (state: RootStateT) =>
  state.usersPage.followingProgress;

export const getFilter = (state: RootStateT) => state.usersPage.filter;
