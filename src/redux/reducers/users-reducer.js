import { usersAPI } from '../../api/api';

const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

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
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));

    dispatch(setCurrentPageAC(currentPage));

    usersAPI.getUsers(pageSize, currentPage).then((data) => {
      dispatch(setUsersAC(data.items));
      //dispatch(setTotalUsersCount(data.totalCount));
      dispatch(setTotalUsersCountAC(300));

      dispatch(toggleIsFetchingAC(false));
    });
  };
};

export const followThC = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, userId));

    usersAPI.follow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(toggleFollowedAC(userId));

        console.log(`++ Followed user with id: ${userId}`);
      }
      dispatch(toggleFollowingProgressAC(false, userId));
    });
  };
};

export const unfollowThC = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, userId));

    usersAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(toggleFollowedAC(userId));
        console.log(`-- unfollowed user with id: ${userId}`);
      }
      dispatch(toggleFollowingProgressAC(false, userId));
    });
  };
};

export default usersReducer;
