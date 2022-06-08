import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header />
        <Navbar />
        <div className="appContentWrapper">
          <Routes>
            <Route
              path="/profile"
              element={
                <Profile
                  state={props.state.profilePage}
                  addPost={props.addPost}
                  updateNewPostText={props.updateNewPostText}
                />
              }
            />
            <Route
              path="/dialogs/*"
              element={
                <Dialogs
                  state={props.state.messagesPage}
                  addMessage={props.addMessage}
                  updateNewMessageText={props.updateNewMessageText}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
