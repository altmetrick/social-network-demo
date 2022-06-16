import s from './Users.module.css';
import userImage from './../../assets/images/User_default_avatar.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { usersAPI } from '../../api/api';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let pagesEls = pages.map((page) => (
    <span
      className={page === props.currentPage ? s.selected : ' '}
      onClick={() => {
        props.onPageChanged(page);
      }}
    >
      {page}
    </span>
  ));

  const followUser = (userId) => {
    props.toggleFollowingProgress(true, userId);

    usersAPI.follow(userId).then((data) => {
      if (data.resultCode === 0) {
        props.toggleFollowed(userId);

        console.log(`++ Followed user with id: ${userId}`);
      }
      props.toggleFollowingProgress(false, userId);
    });
  };

  const unFollowUser = (userId) => {
    props.toggleFollowingProgress(true, userId);

    usersAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        props.toggleFollowed(userId);
        console.log(`-- Unfollowed user with userId: ${userId}`);
      }
      props.toggleFollowingProgress(false, userId);
    });
  };

  let usersEls = props.users.map((user) => (
    <div key={user.id} className={s.userWrapper}>
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
              user.followed ? unFollowUser(user.id) : followUser(user.id);
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
  ));

  return (
    <div>
      {pagesEls}
      <h3>Users</h3>
      {usersEls}
    </div>
  );
};

export default Users;
