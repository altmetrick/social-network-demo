import s from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User/User';

const Users = (props) => {
  const followUser = (userId) => {
    props.follow(userId);
  };

  const unFollowUser = (userId) => {
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
      <Paginator {...props} />
      <h3>Users</h3>
      {usersEls}
    </div>
  );
};

export default Users;
