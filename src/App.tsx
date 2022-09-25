import React, { Suspense, lazy } from 'react';
import './App.css';

//ant
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';

//

import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { initAppThC as initApp } from './redux/reducers/app-reducer';

import Timer from './components/Timer/Timer';
import HeaderContainer from './components/Header/HeaderContainer';
//import ChatPage from './pages/ChatPage/ChatPage';
import Login from './components/Login/Login';
import { UsersPage } from './components/Users/UsersPage';
import { ProfilePage } from './components/Profile/ProfilePage';
import Dialogs from './components/Dialogs/Dialogs';
import Preloader from './components/common/Preloader/Preloader';
import MyForm from './components/MyForm/MyForm';

import { RootStateT } from './redux/redux-store';

const ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'));

//ant
const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [
  {
    icon: UserOutlined,
    elem: <Link to={`/profile/${'myProfile'}`}>Profile</Link>,
  },
  { icon: LaptopOutlined, elem: <Link to="/users">Users</Link> },
  { icon: NotificationOutlined, elem: 'Dialogs' },
].map((item, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(item.icon),
    label: item.elem,

    children: new Array(3).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const menuItems: MenuProps['items'] = [
  {
    key: 'myProfileSub1',
    icon: <UserOutlined />,
    label: 'My Profile',
    children: [
      {
        key: 'my-profile-sub-option1',
        label: <Link to={`/profile/${'myProfile'}`}>Profile</Link>,
      },
      {
        key: 'my-profile-sub-option2',
        label: <Link to="/dialogs">Dialogs</Link>,
      },
    ],
  },
  {
    key: 'usersSub2',
    icon: <LaptopOutlined />,
    label: 'Users',
    children: [
      {
        key: 'users-sub-option1',
        label: <Link to="/users">See Users</Link>,
      },
      {
        key: 'users-sub-option2',
        label: <Link to="/chat">Chat</Link>,
      },
    ],
  },
  {
    key: 'otherSub3',
    icon: <NotificationOutlined />,
    label: 'Other',
    children: [
      {
        key: 'other-sub-option1',
        label: <Link to="/timer">Timer</Link>,
      },
      {
        key: 'other-sub-option2',
        label: <Link to="/myForm">My Form</Link>,
      },
    ],
  },
];

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
      <>
        <HashRouter>
          <Layout>
            <Header className="header">
              <div className="logo" />
              <HeaderContainer />
            </Header>

            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>

              <Layout
                className="site-layout-background"
                style={{ padding: '24px 0' }}
              >
                <Sider className="site-layout-background" width={200}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    items={menuItems}
                  />
                </Sider>

                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                      path="/"
                      element={<Navigate to="/profile/myProfile" />}
                    />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />

                    <Route
                      path="/chat"
                      element={
                        <Suspense fallback={<Preloader />}>
                          <ChatPage />
                        </Suspense>
                      }
                    />

                    <Route path="/dialogs/*" element={<Dialogs />} />
                    <Route path="/timer/" element={<Timer />} />
                    <Route path="/myForm/" element={<MyForm />} />
                  </Routes>
                </Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}> ©2022</Footer>
          </Layout>
        </HashRouter>
      </>
    );
  }
}

const mapStateToProps = (state: RootStateT) => ({
  isInitialized: state.app.isInitialized,
});

export default connect(mapStateToProps, { initApp })(App);
