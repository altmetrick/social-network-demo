import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import { UserT } from '../../types/types';
import React, { FunctionComponent } from 'react';
import UsersSearchForm from './UsersSearchForm';

type PropsT = {
  onPageChanged: (pageNum: number) => void;
  onSearchFormSubmit: (term: string) => void;
  users: Array<UserT>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  followingProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const Users: FunctionComponent<PropsT> = (props) => {
  const followUser = (userId: number) => {
    props.follow(userId);
  };

  const unFollowUser = (userId: number) => {
    props.unfollow(userId);
  };

  let usersEls = props.users.map((user) => (
    <User
      key={user.id}
      user={user}
      followingProgress={props.followingProgress}
      followUser={followUser}
      unFollowUser={unFollowUser}
    />
  ));

  return (
    <div>
      <Paginator {...props} totalItemsCount={props.totalUsersCount} />
      <UsersSearchForm onFormSubmit={props.onSearchFormSubmit} />
      <h3>Users</h3>
      {usersEls}
    </div>
  );
};

export default Users;
