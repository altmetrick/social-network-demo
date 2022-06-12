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
            <Route path="/profile" element={<Profile store={props.store} />} />
            <Route
              path="/dialogs/*"
              element={<Dialogs store={props.store} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
