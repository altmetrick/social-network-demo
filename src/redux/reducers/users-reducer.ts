import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../../api/api';
import { UserT } from '../../types/types';
import { RootStateT } from '../redux-store';

const TOGGLE_FOLLOWED = 'users/TOGGLE_FOLLOWED';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_FOLLOWING_IN_PROGRESS';

const initialState = {
  users: [] as Array<UserT>,
  totalUsersCount: 0,
  pageSize: 5,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>,
};

type StateT = typeof initialState;

const usersReducer = (state = initialState, action: ActionType): StateT => {
  switch (action.type) {
    case TOGGLE_FOLLOWED:
      return {
        ...state,
        users: state.users.map((user) => {
          if (action.userId === user.id) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.id]
          : state.followingProgress.filter((id) => id !== action.id),
      };

    default:
      return state;
  }
};

//Action Creators
type ActionType =
  | ToggleFollowedAT
  | SetUsersAT
  | SetTotalUsersCountAT
  | SetCurrentPageAT
  | ToggleIsFetchingAT
  | ToggleFollowingProgressAT;

type ToggleFollowedAT = {
  type: typeof TOGGLE_FOLLOWED;
  userId: number;
};
export const toggleFollowedAC = (userId: number): ToggleFollowedAT => ({
  type: TOGGLE_FOLLOWED,
  userId,
});

type SetUsersAT = {
  type: typeof SET_USERS;
  users: Array<UserT>;
};
export const setUsersAC = (users: Array<UserT>): SetUsersAT => ({
  type: SET_USERS,
  users,
});

type SetTotalUsersCountAT = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalCount: number;
};
export const setTotalUsersCountAC = (
  totalCount: number
): SetTotalUsersCountAT => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});

type SetCurrentPageAT = {
  type: typeof SET_CURRENT_PAGE;
  pageNumber: number;
};
export const setCurrentPageAC = (pageNumber: number): SetCurrentPageAT => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});

type ToggleIsFetchingAT = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetchingAC = (
  isFetching: boolean
): ToggleIsFetchingAT => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressAT = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS;
  isFetching: boolean;
  id: number;
};
export const toggleFollowingProgressAC = (
  isFetching: boolean,
  id: number
): ToggleFollowingProgressAT => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isFetching,
  id,
});

//Thunk Creators

type ThunkType = ThunkAction<Promise<void>, RootStateT, unknown, ActionType>;

export const getUsersThC = (
  pageSize: number,
  currentPage: number
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));

    let data = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(setUsersAC(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));

    dispatch(toggleIsFetchingAC(false));
  };
};

export const followThC = (userId: number) => {
  return async (dispatch: Dispatch<ActionType>, state: () => RootStateT) => {
    dispatch(toggleFollowingProgressAC(true, userId));

    let data = await usersAPI.follow(userId);

    if (data.resultCode === 0) {
      dispatch(toggleFollowedAC(userId));

      console.log(`++ Followed user with id: ${userId}`);
    }
    dispatch(toggleFollowingProgressAC(false, userId));
  };
};

export const unfollowThC = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, userId));

    let data = await usersAPI.unfollow(userId);

    if (data.resultCode === 0) {
      dispatch(toggleFollowedAC(userId));
      console.log(`-- unfollowed user with id: ${userId}`);
    }
    dispatch(toggleFollowingProgressAC(false, userId));
  };
};

export default usersReducer;
