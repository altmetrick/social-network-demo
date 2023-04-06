let subscribers: SubscriberT[] = [];

let subscribers2 = {
  'message-received': [],
  'status-changed': [],
};

let ws: WebSocket | null = null;

const onCloseHandler = () => {
  setTimeout(createWs, 3000);
};
const onMessageHandler = (e: MessageEvent) => {
  let newMessages = JSON.parse(e.data);

  subscribers.forEach((subscriber) => subscriber(newMessages));
};

function createWs() {
  ws?.removeEventListener('close', onCloseHandler);
  ws?.removeEventListener('message', onMessageHandler);
  ws?.close();

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  ws.addEventListener('close', onCloseHandler);
  ws.addEventListener('message', onMessageHandler);
}

//

export const chatAPI = {
  start() {
    createWs();
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener('close', onCloseHandler);
    ws?.removeEventListener('message', onMessageHandler);
    ws?.close();
  },
  subscribe(callback: SubscriberT) {
    subscribers.push(callback);

    return () => {
      subscribers.filter((subscriber) => subscriber !== callback);
    };
  },
  unsubscribe(callback) {
    subscribers.filter((subscriber) => subscriber !== callback);
  },
  send(message: string) {
    ws?.send(message);
  },
};

export type ChatMessageT = {
  userId: number;
  userName: string;
  message: string;
  photo: string | null;
};

type SubscriberT = (messages: ChatMessageT[]) => void;
