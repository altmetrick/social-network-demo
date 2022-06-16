import React from 'react';
import axios from 'axios';
import { usersAPI } from '../../api/api';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import {
  toggleFollowedAC as toggleFollowed,
  toggleIsFetchingAC as toggleIsFetching,
  setUsersAC as setUsers,
  setCurrentPageAC as setCurrentPage,
  setTotalUsersCountAC as setTotalUsersCount,
  toggleFollowingProgressAC as toggleFollowingProgress,
} from '../../redux/reducers/users-reducer';
import { connect } from 'react-redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);

    usersAPI
      .getUsers(this.props.pageSize, this.props.currentPage)
      .then((data) => {
        this.props.setUsers(data.items);
        this.props.toggleIsFetching(false);

        //this.props.setTotalUsersCount(data.totalCount);
        this.props.setTotalUsersCount(300);
      });
  }

  onPageChanged = (pageNum) => {
    this.props.setCurrentPage(pageNum);
    this.props.toggleIsFetching(true);

    usersAPI.getUsers(this.props.pageSize, pageNum).then((data) => {
      this.props.toggleIsFetching(false);

      this.props.setUsers(data.items);
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
            followingProgress={this.props.followingProgress}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
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
    followingProgress: state.usersPage.followingProgress,
  };
};

export default connect(mapStateToProps, {
  toggleFollowed,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingProgress,
})(UsersContainer);
