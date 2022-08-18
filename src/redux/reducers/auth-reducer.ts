import { FormAction, stopSubmit } from 'redux-form';
import {
  authAPI,
  ResultCodeEnum,
  ResultCodeWithCaptchaEnum,
  securityAPI,
} from '../../api/api';
import { ThunkAction } from 'redux-thunk';
import { InferActionTypes, RootStateT } from '../redux-store';

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

const authReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
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
type ActionTypes = InferActionTypes<typeof actions>;

const actions = {
  setAuthUserDataAC: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    <const>{
      type: SET_AUTH_USER_DATA,
      payload: { userId, email, login, isAuth },
    },

  getCaptchaUrlAC: (captchaUrl: string) =>
    ({
      type: GET_CAPTCHA_URL_SUCCESS,
      payload: { captchaUrl },
    } as const),
};

//ThunkCreators
type ThunkType = ThunkAction<
  Promise<void>,
  RootStateT,
  unknown,
  ActionTypes | FormAction
>;

export const getAuthUserDataThC = (): ThunkType => {
  //by default async f returns a promise which will be resolved
  //after running code of async func
  return async (dispatch) => {
    let data = await authAPI.authMe();

    if (data.resultCode === ResultCodeEnum.Success) {
      let { id, email, login } = data.data;

      console.log(data);
      dispatch(actions.setAuthUserDataAC(id, email, login, true));
    }
  };
  //   return authAPI.authMe().then((data) => {
  //     if (data.resultCode === 0) {
  //       let { id, email, login } = data.data;

  //       console.log(data);
  //       dispatch(setAuthUserDataAC(id, email, login, true));
  //     }
  //   });
  // };
};

export const loginThC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | undefined
): ThunkType => {
  return async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserDataThC());
    } else {
      if (data.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
        let data = await securityAPI.getCaptchaUrl();
        dispatch(actions.getCaptchaUrlAC(data.url));
      }

      let action = stopSubmit('loginForm', {
        _error:
          data.messages.length > 0
            ? data.messages[0]
            : 'Email or Password is wrong!!!',
      });
      dispatch(action);
    }
  };
};

export const logOutThC = (): ThunkType => {
  return async (dispatch) => {
    let data = await authAPI.logOut();

    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.setAuthUserDataAC(null, null, null, false));
    }
  };
};

export default authReducer;
