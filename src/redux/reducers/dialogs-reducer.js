const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let message = {
        id: 33,
        text: action.text,
      };

      return {
        ...state,
        messages: [...state.messages, message],
      };

    default:
      return state;
  }
};

//Action Creators

export const addMessageAC = (text) => ({ type: ADD_MESSAGE, text });

export default dialogsReducer;
