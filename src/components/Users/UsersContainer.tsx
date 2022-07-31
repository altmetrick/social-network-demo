import React, { Component } from 'react';
import { connect } from 'react-redux';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import {
  getUsersThC as getUsers,
  followThC as follow,
  unfollowThC as unfollow,
} from '../../redux/reducers/users-reducer';
import { UserT } from '../../types/types';

type PropsT = {
  users: Array<UserT>;
  totalUsersCount: number;
  isFetching: boolean;
  followingProgress: Array<number>;
  pageSize: number;
  currentPage: number;

  getUsers: (pageSize: number, currentPage: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

class UsersContainer extends Component<PropsT> {
  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage);
  }

  onPageChanged = (pageNum: number) => {
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
