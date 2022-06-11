import { combineReducers, legacy_createStore as createStore } from 'redux';
import profileReducer from './reducers/profile-reducer';
import dialogsReducer from './reducers/dialogs-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
});

const store = createStore(reducers);

window.store = store;

export default store;
