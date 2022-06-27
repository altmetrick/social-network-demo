import { getAuthUserDataThC } from './auth-reducer';

const SUCCESS_INITIALIZATION = 'app/SUCCESS_INITIALIZATION';

const initialState = {
  isInitialized: false,
};

const appReducer = (state = initialState, action) => {
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

export const setInitializedAC = () => ({
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
