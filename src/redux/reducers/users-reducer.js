const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [],
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
        users: [...state.users, ...action.users],
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

export default usersReducer;
