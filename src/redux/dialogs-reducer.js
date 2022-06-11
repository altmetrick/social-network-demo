const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const ADD_MESSAGE = 'ADD_MESSAGE';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.text;
      return state;

    case ADD_MESSAGE:
      let message = {
        id: 33,
        text: state.newMessageText,
      };

      state.messages.push(message);
      state.newMessageText = '';
      return state;

    default:
      return state;
  }
};

//Action Creators
export const updateNewMessageTextAC = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  text: text,
});

export const addMessageAC = () => ({ type: ADD_MESSAGE });

export default dialogsReducer;
