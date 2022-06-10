import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { subscribe } from './redux/state';

import state, {
  addPost,
  updateNewPostText,
  addMessage,
  updateNewMessageText,
} from './redux/state';

// const rerenderEntireTree = () => {
//   ReactDOM.render(
//     <App state={state} addPost={addPost} />,
//     document.getElementById('root')
//   );
// };

const rerenderEntireTreeIndex = (state) => {
  console.log('rerender tree');
  ReactDOM.render(
    <App
      state={state}
      addPost={addPost}
      updateNewPostText={updateNewPostText}
      addMessage={addMessage}
      updateNewMessageText={updateNewMessageText}
    />,
    document.getElementById('root')
  );
};

subscribe(rerenderEntireTreeIndex);

rerenderEntireTreeIndex(state);
