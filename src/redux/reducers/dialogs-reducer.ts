import { DialogT, MessageT } from '../../types/types';

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

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

const dialogsReducer = (state = initialState, action: ActionType): State => {
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
type ActionType = ReturnType<typeof addMessageAC>;

export const addMessageAC = (text: string) =>
  ({
    type: ADD_MESSAGE,
    text,
  } as const);

export default dialogsReducer;
