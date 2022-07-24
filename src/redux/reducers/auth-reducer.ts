import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../../api/api';

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type State = typeof initialState;

const authReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        userId: 'io',
        ...action.payload,
      };

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

//Action Creators
type setAuthUserDataAT = {
  type: typeof SET_AUTH_USER_DATA;
  payload: {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
  };
};

export const setAuthUserDataAC = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setAuthUserDataAT => ({
  type: SET_AUTH_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type getCaptchaUrlAT = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

export const getCaptchaUrlAC = (captchaUrl: string): getCaptchaUrlAT => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//ThunkCreators
export const getAuthUserDataThC = () => {
  //by default async f returns a promise which will be resolved
  //after running code of async func
  return async (dispatch) => {
    let data = await authAPI.authMe();

    if (data.resultCode === 0) {
      let { id, email, login } = data.data;

      console.log(data);
      dispatch(setAuthUserDataAC(id, email, login, true));
    }
  };

  // return  (dispatch) => {
  //   return authAPI.authMe().then((data) => {
  //     if (data.resultCode === 0) {
  //       let { id, email, login } = data.data;

  //       console.log(data);
  //       dispatch(setAuthUserDataAC(id, email, login, true));
  //     }
  //   });
  // };
};

export const loginThC = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let res = await authAPI.login(email, password, rememberMe, captcha);

    if (res.data.resultCode === 0) {
      dispatch(getAuthUserDataThC());
    } else {
      if (res.data.resultCode === 10) {
        let res = await securityAPI.getCaptchaUrl();
        dispatch(getCaptchaUrlAC(res.data.url));
      }

      let action = stopSubmit('loginForm', {
        _error:
          res.data.messages.length > 0
            ? res.data.messages[0]
            : 'Email or Password is wrong!!!',
      });
      dispatch(action);
    }
  };
};

export const logOutThC = () => {
  return async (dispatch) => {
    let res = await authAPI.logOut();

    if (res.data.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, false));
    }
  };
};

export default authReducer;
