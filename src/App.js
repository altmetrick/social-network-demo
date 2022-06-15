import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

import Dialogs from './components/Dialogs/Dialogs';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header />
        <Navbar />
        <div className="appContentWrapper">
          <Routes>
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/dialogs/*" element={<Dialogs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
