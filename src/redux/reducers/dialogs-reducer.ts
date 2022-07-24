const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

type DialogT = {
  id: number;
  name: string;
};

type MessageT = {
  id: number;
  text: string;
};

const initialState = {
  dialogs: [
    { id: 1, name: 'Jack' },
    { id: 2, name: 'Nick' },
    { id: 3, name: 'Jess' },
    { id: 4, name: 'Ket' },
    { id: 5, name: 'Sam' },
  ] as Array<DialogT>,
  messages: [
    { id: 1, text: 'Hello kdfsdf' },
    { id: 2, text: 'HOw are you bro ' },
    { id: 3, text: 'Hi Jack' },
    { id: 4, text: 'Hey hey hey' },
    { id: 5, text: 'Ola Ola Ola' },
  ] as Array<MessageT>,
};

type State = typeof initialState;

const dialogsReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case ADD_MESSAGE:
      let message = {
        id: 90,
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
type AddMessageT = {
  type: typeof ADD_MESSAGE;
  text: string;
};

export const addMessageAC = (text: string): AddMessageT => ({
  type: ADD_MESSAGE,
  text,
});

export default dialogsReducer;
