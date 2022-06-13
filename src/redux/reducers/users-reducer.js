const TOGGLE_IS_FOLLOWED = 'TOGGLE_IS_FOLLOWED';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_FOLLOWED:
      return {
        ...state,
        users: state.users.map((user) => {
          if (action.userId === user.id) {
            return { ...user, isFollowed: !user.isFollowed };
          }
          return user;
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };

    default:
      return state;
  }
};

//Action Creators
export const toggleIsFollowedAC = (userId) => ({
  type: TOGGLE_IS_FOLLOWED,
  userId,
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users,
});

export default usersReducer;
