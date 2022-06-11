import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

const store = {
  _state: {
    profilePage: {
      newPostText: 'Initial text',
      posts: [
        { id: '1', text: 'My first post', likes: 1 },
        { id: '2', text: "What's up, man, today...", likes: 12 },
        { id: '3', text: 'Jack of all trades master of none', likes: 13 },
        { id: '4', text: 'Lorem ipsum Ola ', likes: 16 },
      ],
    },
    dialogsPage: {
      newMessageText: 'Initial text',
      dialogs: [
        { id: 1, name: 'Jack' },
        { id: 2, name: 'Nick' },
        { id: 3, name: 'Jess' },
        { id: 4, name: 'Ket' },
        { id: 5, name: 'Sam' },
      ],
      messages: [
        { id: 1, text: 'Hello kdfsdf' },
        { id: 2, text: 'HOw are you bro ' },
        { id: 3, text: 'Hi Jack' },
        { id: 4, text: 'Hey hey hey' },
        { id: 5, text: 'Ola Ola Ola' },
      ],
    },
  },

  _callSubscriber() {
    console.log('state was changed');
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  getState() {
    return this._state;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
