import { combineReducers, legacy_createStore as createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import profileReducer from './reducers/profile-reducer';
import dialogsReducer from './reducers/dialogs-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';
import appReducer from './reducers/app-reducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  authData: authReducer,
  app: appReducer,
  form: formReducer,
});

//const store = createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootStateT = ReturnType<typeof rootReducer>;
export type AppDispatchT = typeof store.dispatch;

declare global {
  interface Window {
    store: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
//

//Generic for ActionTypes
type InferValueTypesFromOjbType<T> = T extends { [key: string]: infer V }
  ? V
  : never;

export type InferActionTypes<
  T extends { [key: string]: (...args: any) => any }
> = ReturnType<InferValueTypesFromOjbType<T>>;

window.store = store;

export default store;
