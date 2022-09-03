import React, { Component } from 'react';
import { connect } from 'react-redux';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import {
  getUsersThC as getUsers,
  followThC as follow,
  unfollowThC as unfollow,
  FilterType,
} from '../../redux/reducers/users-reducer';
import { UserT } from '../../types/types';
import { RootStateT } from '../../redux/redux-store';

type MapStatePropsT = {
  users: Array<UserT>;
  totalUsersCount: number;
  isFetching: boolean;
  followingProgress: Array<number>;
  pageSize: number;
  currentPage: number;
  filter: FilterType;
};

type MapDispatchPropsT = {
  getUsers: (pageSize: number, currentPage: number, filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type OwnPropsT = {};

type PropsT = MapDispatchPropsT & MapStatePropsT & OwnPropsT;

class UsersContainer extends Component<PropsT> {
  componentDidMount() {
    this.props.getUsers(
      this.props.pageSize,
      this.props.currentPage,
      this.props.filter
    );
  }

  onPageChanged = (pageNum: number) => {
    this.props.getUsers(this.props.pageSize, pageNum, this.props.filter);
  };

  onFilterChanged = (filter: FilterType) => {
    this.props.getUsers(this.props.pageSize, 1, filter);
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
            onFilterChanged={this.onFilterChanged}
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

const mapStateToProps = (state: RootStateT): MapStatePropsT => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
    filter: state.usersPage.filter,
  };
};

export default connect<
  MapStatePropsT,
  MapDispatchPropsT,
  OwnPropsT,
  RootStateT
>(mapStateToProps, {
  getUsers,
  follow,
  unfollow,
})(UsersContainer);
