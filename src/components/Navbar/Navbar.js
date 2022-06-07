import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className={`${s.item} ${s.active}`}>Profile</div>
      <div className={s.item}>Messages</div>
      <div className={s.item}>News</div>
      <div className={s.item}>Settings</div>
    </div>
  );
};

export default Navbar;
