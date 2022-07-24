import { getAuthUserDataThC } from './auth-reducer';

const SUCCESS_INITIALIZATION = 'app/SUCCESS_INITIALIZATION';

const initialState = {
  isInitialized: false,
};

type State = typeof initialState;

const appReducer = (state = initialState, action: any): State => {
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
type successInitAT = {
  type: typeof SUCCESS_INITIALIZATION;
};

export const setInitializedAC = (): successInitAT => ({
  type: SUCCESS_INITIALIZATION,
});

//ThunkCreators

export const initAppThC = () => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserDataThC());

    promise.then(() => {
      dispatch(setInitializedAC());
    });
  };
};

export default appReducer;
