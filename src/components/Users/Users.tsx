import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import React, { FunctionComponent } from 'react';
import UsersSearchForm from './UsersSearchForm';
import {
  ActionType,
  FilterType,
  followThC,
  getUsersThC,
  ThunkType,
  unfollowThC,
} from '../../redux/reducers/users-reducer';
import { useSelector } from 'react-redux';
import {
  getCurrentPage,
  getFilter,
  getFollowingProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/selectors/users-selectors';
import { useDispatch } from 'react-redux';

type PropsT = {};

const Users: FunctionComponent<PropsT> = (props) => {
  const users = useSelector(getUsers);
  const followingProgress = useSelector(getFollowingProgress);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const onPageChanged = (pageNum: number) => {
    dispatch<any>(getUsersThC(pageSize, pageNum, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch<any>(getUsersThC(pageSize, 1, filter));
  };

  const followUser = (userId: number) => {
    dispatch<any>(followThC(userId));
  };
  const unFollowUser = (userId: number) => {
    dispatch<any>(unfollowThC(userId));
  };

  let usersEls = users.map((user) => (
    <User
      key={user.id}
      user={user}
      followingProgress={followingProgress}
      followUser={followUser}
      unFollowUser={unFollowUser}
    />
  ));

  return (
    <div>
      <Paginator
        {...props}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <UsersSearchForm onFilterChanged={onFilterChanged} filter={filter} />
      <h3>Users</h3>
      {usersEls}
    </div>
  );
};

export default Users;
