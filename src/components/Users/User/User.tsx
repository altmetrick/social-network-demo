import s from './../Users.module.css';
import userImage from './../../../assets/images/User_default_avatar.png';
import { Link } from 'react-router-dom';
import React, { FunctionComponent } from 'react';
import { UserT } from '../../../types/types';

type PropsT = {
  user: UserT;
  followingProgress: Array<number>;
  followUser: (userId: number) => void;
  unFollowUser: (userId: number) => void;
};

const User: FunctionComponent<PropsT> = (props) => {
  const { user } = props;

  return (
    <div className={s.userWrapper}>
      <div>
        <div>
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.photos.small === null ? userImage : user.photos.small}
            />
          </Link>
        </div>

        <div>
          <button
            disabled={props.followingProgress.some((id) => id === user.id)}
            onClick={() => {
              user.followed
                ? props.unFollowUser(user.id)
                : props.followUser(user.id);
            }}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>

      <div className={s.userBio}>
        <h3>{user.name}</h3>
        <h4>location: ---</h4>
      </div>
    </div>
  );
};

export default User;
