import { usersAPI } from '../../api/api';

const TOGGLE_FOLLOWED = 'users/TOGGLE_FOLLOWED';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_FOLLOWING_IN_PROGRESS';

const initialState = {
  users: [],
  totalUsersCount: 103,
  pageSize: 5,
  currentPage: 1,
  isFetching: false,
  followingProgress: [],
  fake: 0,
};

const usersReducer = (state = initialState, action) => {
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
export const toggleFollowedAC = (userId) => ({
  type: TOGGLE_FOLLOWED,
  userId,
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users,
});

export const setTotalUsersCountAC = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});

export const setCurrentPageAC = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});

export const toggleIsFetchingAC = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggleFollowingProgressAC = (isFetching, id) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isFetching,
  id,
});

//Thunk Creators
export const getUsersThC = (pageSize, currentPage) => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));

    let data = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(setUsersAC(data.items));
    //dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setTotalUsersCountAC(300));
    dispatch(toggleIsFetchingAC(false));
  };
};

export const followThC = (userId) => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, userId));

    let data = await usersAPI.follow(userId);

    if (data.resultCode === 0) {
      dispatch(toggleFollowedAC(userId));

      console.log(`++ Followed user with id: ${userId}`);
    }
    dispatch(toggleFollowingProgressAC(false, userId));
  };
};

export const unfollowThC = (userId) => {
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
