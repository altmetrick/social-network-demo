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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
type UsersPagePropsT = {};

export const UsersPage: FunctionComponent<UsersPagePropsT> = (props) => {
  const isFetching = useSelector(getIsFetching);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    //Setting params on dependencies change
    setSearchParams({
      count: pageSize,
      page: currentPage,
      term: filter.term,
      friend: String(filter.friend),
    } as never);
  }, [filter, pageSize, currentPage]);

  useEffect(() => {
    //Read query params from address bar on initial comp load
    const currentParams = Object.fromEntries(searchParams);

    const pageSizeParam = parseInt(currentParams.count);
    const currentPageParam = parseInt(
      !currentParams.page ? '1' : currentParams.page
    );
    const filterParam = {
      term: currentParams.term == undefined ? '' : currentParams.term,
      friend:
        currentParams.friend === ('null' && undefined)
          ? null
          : currentParams.friend === 'true'
          ? true
          : false,
    };

    //call getUsersThC with arguments from query string on component load
    dispatch<any>(getUsersThC(pageSizeParam, currentPageParam, filterParam));
  }, []);

  return (
    <>
      {isFetching && <Preloader />}

      {!isFetching && <Users />}
    </>
  );
};
