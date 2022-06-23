import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initAppThC as initApp } from './redux/reducers/app-reducer';

import Timer from './components/Timer/Timer';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Dialogs from './components/Dialogs/Dialogs';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    if (!this.props.isInitialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <div className="appWrapper">
          <HeaderContainer />
          <Navbar />
          <div className="appContentWrapper">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/users" element={<UsersContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
              <Route path="/timer/" element={<Timer />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isInitialized: state.app.isInitialized,
});

export default connect(mapStateToProps, { initApp })(App);
