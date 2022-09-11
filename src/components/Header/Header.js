import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

const Header = (props) => {
  return (
    <Row>
      <Col span={6}>
        {props.isAuth ? (
          <div>
            <span className="profileLogin">{props.login}</span>

            <Button type="primary" size="small" onClick={props.logOut}>
              LogOut
            </Button>
          </div>
        ) : (
          <Link to="/login">login</Link>
        )}
      </Col>
    </Row>
  );
};

export default Header;
