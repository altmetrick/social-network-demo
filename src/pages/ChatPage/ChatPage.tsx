import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateT } from '../../redux/redux-store';
import {
  sendMessageThC,
  StartMessageListeningThC,
  StopMessageListeningThC,
} from '../../redux/reducers/chat-reducer';

const ChatPage: FunctionComponent<any> = (props) => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: FunctionComponent<any> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(StartMessageListeningThC());
    return () => {
      dispatch<any>(StopMessageListeningThC());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

type ChatMessageT = {
  userId: number;
  userName: string;
  message: string;
  photo: string | null;
};

const Messages: FunctionComponent<{}> = (props) => {
  const messages = useSelector((state: RootStateT) => state.chat.messages);

  const messagesEls = messages.map((item) => (
    <Message key={Math.random()} {...item} />
  ));

  return (
    <div style={{ height: '60vh', overflowY: 'scroll' }}>{messagesEls}</div>
  );
};

const Message: FunctionComponent<ChatMessageT> = (props) => {
  return (
    <div>
      <div>
        <img src={props.photo || ''} style={{ height: '80px' }} />
        <b>{props.userName}</b>
      </div>
      <div>{props.message}</div>
      <hr />
      <br />
    </div>
  );
};

const AddMessageForm: FunctionComponent<{}> = (props) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const onMessageChanged = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSend = () => {
    dispatch<any>(sendMessageThC(message));

    setMessage('');
  };

  return (
    <div>
      <div>
        <textarea value={message} onChange={onMessageChanged} />
      </div>
      <button disabled={false} onClick={onMessageSend}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
