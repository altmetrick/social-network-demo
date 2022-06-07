import './App.css';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <div className="appWrapper">
      <Header />
      <Navbar />
      <div className="mainContent">
        <Profile />
      </div>
    </div>
  );
};

export default App;
