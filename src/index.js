import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

let state = store.getState();

const rerenderEntireTreeIndex = (state) => {
  console.log('rerender tree');
  ReactDOM.render(
    <Provider store={store}>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </Provider>,
    document.getElementById('root')
  );
};

rerenderEntireTreeIndex(state);

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTreeIndex(state);
});
