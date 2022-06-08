import './index.css';
// import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';

import state, { addPost } from './redux/state';

import { rerenderEntireTree } from './rerender';
// const rerenderEntireTree = () => {
//   ReactDOM.render(
//     <App state={state} addPost={addPost} />,
//     document.getElementById('root')
//   );
// };

rerenderEntireTree(state);
