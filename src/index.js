import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/state';

let state = store.getState();

const rerenderEntireTreeIndex = (state) => {
  console.log('rerender tree');
  ReactDOM.render(
    <App
      state={state}
      addPost={store.addPost.bind(store)}
      updateNewPostText={store.updateNewPostText.bind(store)}
      addMessage={store.addMessage.bind(store)}
      updateNewMessageText={store.updateNewMessageText.bind(store)}
    />,
    document.getElementById('root')
  );
};

store.subscribe(rerenderEntireTreeIndex);

rerenderEntireTreeIndex(state);
