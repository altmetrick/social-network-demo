import Users from './Users';

import {
  toggleFollowedAC,
  setUsersAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
} from '../../redux/reducers/users-reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
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
    setCurrentPage: (pageNum) => {
      dispatch(setCurrentPageAC(pageNum));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
