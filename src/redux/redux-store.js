import { combineReducers, legacy_createStore as createStore } from 'redux';
import profileReducer from './reducers/profile-reducer';
import dialogsReducer from './reducers/dialogs-reducer';
import usersReducer from './reducers/users-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
});

const store = createStore(reducers);

window.store = store;

export default store;
