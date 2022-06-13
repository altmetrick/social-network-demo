const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

const initialState = {
  users: [],
  totalUsersCount: 103,
  pageSize: 5,
  currentPage: 15,
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

export default usersReducer;
