import s from './Navbar.module.css';

import { Link } from 'react-router-dom';
import Timer from '../Timer/Timer';

const Navbar = () => {
  let defaultUserId = 22896;

  return (
    <div className="navbar">
      <div className={s.item}>
        <Link to="/users">Users</Link>
      </div>

      <div className={s.item}>
        <Link to={`/profile/${'myProfile'}`}>Profile</Link>
      </div>

      <div className={s.item}>
        <Link to="/dialogs">Dialogs</Link>
      </div>

      <div className={s.item}>
        <Link to="/messages">Messages</Link>
      </div>

      <div className={s.item}>
        <Link to="/settings">Settings</Link>
      </div>

      <div className={s.item}>
        <Link to="/timer">Timer</Link>
      </div>
    </div>
  );
};

export default Navbar;
