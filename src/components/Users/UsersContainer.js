import React from 'react';
import axios from 'axios';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import {
  toggleFollowedAC as toggleFollowed,
  toggleIsFetchingAC as toggleIsFetching,
  setUsersAC as setUsers,
  setCurrentPageAC as setCurrentPage,
  setTotalUsersCountAC as setTotalUsersCount,
} from '../../redux/reducers/users-reducer';
import { connect } from 'react-redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((res) => {
        this.props.setUsers(res.data.items);
        this.props.toggleIsFetching(false);

        //this.props.setTotalUsersCount(res.data.totalCount);
        this.props.setTotalUsersCount(153);
      });
  }

  onPageChanged = (pageNum) => {
    this.props.setCurrentPage(pageNum);
    this.props.toggleIsFetching(true);

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNum}`
      )
      .then((res) => {
        this.props.toggleIsFetching(false);

        this.props.setUsers(res.data.items);
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching && <Preloader />}

        {!this.props.isFetching && (
          <Users
            onPageChanged={this.onPageChanged}
            toggleFollowed={this.props.toggleFollowed}
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            isFetching={this.props.isFetching}
            toggleIsFetching={this.props.toggleIsFetching}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  toggleFollowed,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
})(UsersContainer);
