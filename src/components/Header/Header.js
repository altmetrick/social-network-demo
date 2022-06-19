import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header">
      {props.isAuth ? (
        <div>
          <div>{props.login}</div>
          <div>
            <button onClick={props.logOut}>LogOut</button>
          </div>
        </div>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  );
};

export default Header;
