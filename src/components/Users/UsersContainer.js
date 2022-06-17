import React from 'react';
import axios from 'axios';
import { usersAPI } from '../../api/api';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import {
  getUsersThC as getUsers,
  followThC as follow,
  unfollowThC as unfollow,
} from '../../redux/reducers/users-reducer';
import { connect } from 'react-redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage);
  }

  onPageChanged = (pageNum) => {
    this.props.getUsers(this.props.pageSize, pageNum);
  };

  render() {
    return (
      <>
        {this.props.isFetching && <Preloader />}

        {!this.props.isFetching && (
          <Users
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            //
            followingProgress={this.props.followingProgress}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
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
  getUsers,
  follow,
  unfollow,
})(UsersContainer);
