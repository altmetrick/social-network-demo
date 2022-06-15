import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header">
      {props.isAuth ? (
        <div> {props.login} </div>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  );
};

export default Header;
