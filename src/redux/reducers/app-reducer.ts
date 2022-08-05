import { getAuthUserDataThC } from './auth-reducer';
import { ThunkAction } from 'redux-thunk';
import { RootStateT } from '../redux-store';

const SUCCESS_INITIALIZATION = 'app/SUCCESS_INITIALIZATION';

const initialState = {
  isInitialized: false,
};

type State = typeof initialState;

const appReducer = (state = initialState, action: ActionType): State => {
  switch (action.type) {
    case SUCCESS_INITIALIZATION:
      return {
        ...state,
        isInitialized: true,
      };

    default:
      return state;
  }
};

//Action Creators
type ActionType = SuccessInitAT;

type SuccessInitAT = {
  type: typeof SUCCESS_INITIALIZATION;
};

export const setInitializedAC = (): SuccessInitAT => ({
  type: SUCCESS_INITIALIZATION,
});

//ThunkCreators
type ThunkType = ThunkAction<Promise<void>, RootStateT, unknown, ActionType>;

export const initAppThC = (): ThunkType => {
  return async (dispatch) => {
    let promise = dispatch(getAuthUserDataThC());

    promise.then(() => {
      dispatch(setInitializedAC());
    });
  };
};

export default appReducer;
