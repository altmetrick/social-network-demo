import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateT } from '../../redux/redux-store';

const ChatPage: FunctionComponent<any> = (props) => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: FunctionComponent<any> = (props) => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;

    const closeHandler = () => {
      debugger;
      console.log('closed');
      setTimeout(createWs, 3000);
    };

    function createWs() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
      );
      ws.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }

    createWs();
    debugger;

    return () => {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();
    };
  }, []);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

type MessageT = {
  userId: number;
  userName: string;
  message: string;
  photo: string | null;
};

const Messages: FunctionComponent<{ wsChannel: WebSocket | null }> = (
  props
) => {
  const [messages, setMessages] = useState<MessageT[]>([]);

  useEffect(() => {
    const onMessageHandler: any = (e) => {
      console.log(e);
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      console.log(newMessages);
    };

    //listening for new messages from ws
    props.wsChannel?.addEventListener('message', onMessageHandler);

    return () => {
      props.wsChannel?.removeEventListener('message', onMessageHandler);
    };
  }, [props.wsChannel]);

  ///
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

const AddMessageForm: FunctionComponent<{ wsChannel: WebSocket | null }> = (
  props
) => {
  const [message, setMessage] = useState('');
  const [chanelStatus, setChanelStatus] = useState<'pending' | 'ready'>(
    'pending'
  );

  useEffect(() => {
    const openHandler = () => {
      setChanelStatus('ready');
    };
    //listening for open event of ws
    props.wsChannel?.addEventListener('open', openHandler);

    return () => {
      //removing event listener in cleanup function
      props.wsChannel?.removeEventListener('open', openHandler);
    };
  }, [props.wsChannel]);

  const onMessageChanged = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSent = () => {
    props.wsChannel?.send(message);

    setMessage('');
  };

  return (
    <div>
      <div>
        <textarea value={message} onChange={onMessageChanged} />
      </div>
      <button disabled={chanelStatus !== 'ready'} onClick={onMessageSent}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
