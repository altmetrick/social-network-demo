import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

import { getUsersThC } from '../../redux/reducers/users-reducer';

import {
  getIsFetching,
  getFilter,
  getPageSize,
  getCurrentPage,
} from '../../redux/selectors/users-selectors';
type UsersPagePropsT = {};

export const UsersPage: FunctionComponent<UsersPagePropsT> = (props) => {
  const isFetching = useSelector(getIsFetching);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUsersThC(pageSize, currentPage, filter));
  }, []);

  return (
    <>
      {isFetching && <Preloader />}

      {!isFetching && <Users />}
    </>
  );
};
