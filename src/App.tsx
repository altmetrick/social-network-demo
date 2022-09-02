import React, { Suspense, lazy } from 'react';
import './App.css';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import MyForm from './components/MyForm/MyForm';
import { RootStateT } from './redux/redux-store';

// const UsersContainer = React.lazy(() =>
//   import('./components/Users/UsersContainer')
// );
// const ProfileContainer = React.lazy(() =>
//   import('./components/Profile/ProfileContainer')
// );

type OwnPropsT = {};
type MapStatePropsT = { isInitialized: boolean };
type MapDispatchPropsT = { initApp: () => void };
type PropsT = OwnPropsT & MapStatePropsT & MapDispatchPropsT;

class App extends React.Component<PropsT> {
  catchAllUnhandledErrors = (reason, e) => {
    console.log(reason);
    alert('Some error has ocurred');
  };

  componentDidMount() {
    this.props.initApp();

    //window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    // window.removeEventListener(
    //   'unhandledrejection',
    //   this.catchAllUnhandledErrors
    // );
  }

  render() {
    if (!this.props.isInitialized) {
      return <Preloader />;
    }

    return (
      <HashRouter>
        <div className="appWrapper">
          <HeaderContainer />
          <Navbar />

          <div className="appContentWrapper">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                  path="/"
                  element={<Navigate to="/profile/myProfile" />}
                />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route path="/dialogs/*" element={<Dialogs />} />
                <Route path="/timer/" element={<Timer />} />
                <Route path="/myForm/" element={<MyForm />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state: RootStateT) => ({
  isInitialized: state.app.isInitialized,
});

export default connect(mapStateToProps, { initApp })(App);
