import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../../api/api';
import { UserT } from '../../types/types';
import { InferActionTypes, RootStateT } from '../redux-store';

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
type ActionType = InferActionTypes<typeof actions>;

const actions = {
  toggleFollowedAC: (userId: number) =>
    ({
      type: TOGGLE_FOLLOWED,
      userId,
    } as const),

  setUsersAC: (users: Array<UserT>) =>
    ({
      type: SET_USERS,
      users,
    } as const),

  setTotalUsersCountAC: (totalCount: number) =>
    ({
      type: SET_TOTAL_USERS_COUNT,
      totalCount,
    } as const),

  setCurrentPageAC: (pageNumber: number) =>
    ({
      type: SET_CURRENT_PAGE,
      pageNumber,
    } as const),

  toggleIsFetchingAC: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const),

  toggleFollowingProgressAC: (isFetching: boolean, id: number) =>
    ({
      type: TOGGLE_FOLLOWING_IN_PROGRESS,
      isFetching,
      id,
    } as const),
};

//Thunk Creators

type ThunkType = ThunkAction<Promise<void>, RootStateT, unknown, ActionType>;

export const getUsersThC = (
  pageSize: number,
  currentPage: number
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.setCurrentPageAC(currentPage));

    let data = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(actions.setUsersAC(data.items));
    dispatch(actions.setTotalUsersCountAC(data.totalCount));

    dispatch(actions.toggleIsFetchingAC(false));
  };
};

export const followThC = (userId: number) => {
  return async (dispatch: Dispatch<ActionType>, state: () => RootStateT) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId));

    let data = await usersAPI.follow(userId);

    if (data.resultCode === 0) {
      dispatch(actions.toggleFollowedAC(userId));

      console.log(`++ Followed user with id: ${userId}`);
    }
    dispatch(actions.toggleFollowingProgressAC(false, userId));
  };
};

export const unfollowThC = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId));

    let data = await usersAPI.unfollow(userId);

    if (data.resultCode === 0) {
      dispatch(actions.toggleFollowedAC(userId));
      console.log(`-- unfollowed user with id: ${userId}`);
    }
    dispatch(actions.toggleFollowingProgressAC(false, userId));
  };
};

export default usersReducer;
