import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { addPost, updateNewPostText } from './redux/state';

export const rerenderEntireTree = (state) => {
  console.log('rerender tree');
  ReactDOM.render(
    <App
      state={state}
      addPost={addPost}
      updateNewPostText={updateNewPostText}
    />,
    document.getElementById('root')
  );
};
