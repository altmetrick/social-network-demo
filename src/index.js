import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/redux-store';

let state = store.getState();

const rerenderEntireTreeIndex = (state) => {
  console.log('rerender tree');
  ReactDOM.render(
    <App state={state} dispatch={store.dispatch.bind(store)} />,
    document.getElementById('root')
  );
};

rerenderEntireTreeIndex(state);

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTreeIndex(state);
});
