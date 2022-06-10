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
    messagesPage: {
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
    switch (action.type) {
      //Profile
      case 'UPDATE_NEW_POST_TEXT':
        this._state.profilePage.newPostText = action.text;
        console.log('updated posts text');
        this._callSubscriber(this._state);
        break;

      case 'ADD_POST':
        let post = {
          id: '11',
          likes: 99,
          text: this._state.profilePage.newPostText,
        };

        this._state.profilePage.posts.push(post);

        console.log(this._state);
        this._state.profilePage.newPostText = ' ';
        this._callSubscriber(this._state);
        break;

      //Dialogs
      case 'UPDATE_NEW_MESSAGE_TEXT':
        this._state.messagesPage.newMessageText = action.text;
        this._callSubscriber(this._state);
        break;

      case 'ADD_MESSAGE':
        let message = {
          id: 33,
          text: this._state.messagesPage.newMessageText,
        };

        this._state.messagesPage.messages.push(message);
        this._state.messagesPage.newMessageText = '';
        this._callSubscriber(this._state);
        break;

      default:
        break;
    }
  },

  //Profile
  addPost() {
    let post = {
      id: '11',
      likes: 99,
      text: this._state.profilePage.newPostText,
    };

    this._state.profilePage.posts.push(post);

    console.log(this._state);
    this._state.profilePage.newPostText = ' ';
    this._callSubscriber(this._state);
  },

  updateNewPostText(text) {
    this._state.profilePage.newPostText = text;
    console.log('updated posts text');
    this._callSubscriber(this._state);
  },

  //Dialogs
  updateNewMessageText(text) {
    this._state.messagesPage.newMessageText = text;
    this._callSubscriber(this._state);
  },

  addMessage() {
    let message = {
      id: 33,
      text: this._state.messagesPage.newMessageText,
    };

    this._state.messagesPage.messages.push(message);
    this._state.messagesPage.newMessageText = '';
    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
