import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateT } from '../../redux/redux-store';

const chatSocket = new WebSocket(
  'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
);

console.log('web socket');
debugger;

const ChatPage: FunctionComponent<any> = (props) => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: FunctionComponent<any> = (props) => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

type MessageT = {
  userId: number;
  userName: string;
  message: string;
  photo: string | null;
};

const Messages: FunctionComponent<any> = (props) => {
  const [messages, setMessages] = useState<MessageT[]>([]);

  useEffect(() => {
    console.log('hellofdfgdf');
    //@ts-ignore
    chatSocket.onmessage = (e) => {
      console.log(e);
      console.log('first');
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      console.log(newMessages);
      debugger;
    };
  }, []);

  const messagesEls = messages.map((item) => (
    <Message key={Math.random()} {...item} />
  ));

  return (
    <div style={{ height: '60vh', overflowY: 'scroll' }}>{messagesEls}</div>
  );
};

const Message: FunctionComponent<MessageT> = (props) => {
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

const AddMessageForm: FunctionComponent<any> = (props) => {
  const [message, setMessage] = useState('');

  const onMessageChanged = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSent = () => {
    chatSocket.send(message);
    setMessage('');
  };

  return (
    <div>
      <div>
        <textarea value={message} onChange={onMessageChanged} />
      </div>
      <button onClick={onMessageSent}>Send</button>
    </div>
  );
};

export default ChatPage;
