import { stopSubmit } from 'redux-form';
import { authAPI } from '../../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.userData,
      };

    default:
      return state;
  }
};

//Action Creators

export const setAuthUserDataAC = (userId, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  userData: { userId, email, login, isAuth },
});

//ThunkCreators
export const getAuthUserDataThC = () => {
  return (dispatch) => {
    return authAPI.authMe().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;

        console.log(data);
        dispatch(setAuthUserDataAC(id, email, login, true));
      }
    });
  };
};

export const loginThC = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserDataThC());
      } else {
        let action = stopSubmit('loginForm', {
          _error:
            res.data.messages.length > 0
              ? res.data.messages[0]
              : 'Email or Password is wrong!!!',
        });
        dispatch(action);
      }
    });
  };
};

export const logOutThC = () => {
  return (dispatch) => {
    authAPI.logOut().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false));
      }
    });
  };
};

export default authReducer;
