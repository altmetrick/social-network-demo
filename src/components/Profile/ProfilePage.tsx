import s from './Profile.module.css';
import React, { Component, FunctionComponent, useEffect } from 'react';

import Profile from './Profile';
import AuthRedirect from '../../hoc/AuthRedirect';

import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getProfileThC,
  getUserStatusThC,
} from '../../redux/reducers/profile-reducer';

import { getUserId } from '../../redux/selectors/auth-selectors';

type PropsT = {};

export const ProfilePage: FunctionComponent<PropsT> = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const authUserId = useSelector(getUserId);

  const refreshProfile = () => {
    let userId: string | undefined | number | null = params.userId;
    if (userId === 'myProfile') userId = authUserId;
    if (userId) {
      dispatch<any>(getProfileThC(parseInt(userId as string)));
      dispatch<any>(getUserStatusThC(parseInt(userId as string)));
    }
  };

  useEffect(() => {
    refreshProfile();
  }, [params.userId]);

  const isOwner =
    (authUserId && params.userId === 'myProfile') ||
    (authUserId && params.userId == authUserId.toString());

  return <Profile isOwner={!!isOwner} />;
};
