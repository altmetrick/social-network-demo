import Users from './Users';

import {
  toggleFollowedAC,
  setUsersAC,
} from '../../redux/reducers/users-reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFollowed: (id) => {
      dispatch(toggleFollowedAC(id));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
