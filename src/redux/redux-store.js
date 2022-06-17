import { combineReducers, legacy_createStore as createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import profileReducer from './reducers/profile-reducer';
import dialogsReducer from './reducers/dialogs-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  authData: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
