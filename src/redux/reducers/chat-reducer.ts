import { ThunkAction } from 'redux-thunk';
import { InferActionTypes, RootStateT } from '../redux-store';
import { ChatMessageT, chatAPI } from '../../api/chat-api';
import { Dispatch } from 'redux';

const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED';

const initialState = {
  messages: [] as ChatMessageT[],
};

type State = typeof initialState;

const chatReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };

    default:
      return state;
  }
};

//Action Creators
type ActionTypes = InferActionTypes<typeof actions>;

const actions = {
  messagesReceived: (messages: ChatMessageT[]) =>
    <const>{
      type: MESSAGES_RECEIVED,
      payload: { messages },
    },
};

//ThunkCreators
type ThunkType = ThunkAction<Promise<void>, RootStateT, unknown, ActionTypes>;

let _newMessagesHandler: ((messages: ChatMessageT[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages: ChatMessageT[]): void => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessagesHandler;
};

export const StartMessageListeningThC =
  (): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.start();

    chatAPI.subscribe(newMessagesHandlerCreator(dispatch));
  };

export const StopMessageListeningThC = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessageThC =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.send(message);
  };

export default chatReducer;
