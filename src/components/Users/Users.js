import s from './Users.module.css';
import userImage from './../../assets/images/User_default_avatar.png';

import axios from 'axios';

let ss = {
  name: 'Dicastes',
  id: 24440,
  uniqueUrlName: null,
  photos: {
    small: null,
    large: null,
  },
  status: null,
  followed: false,
};

const Users = (props) => {
  if (props.users.length === 0) {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then((res) => {
        props.setUsers(res.data.items);
      });
  }

  let usersEls = props.users.map((user) => (
    <div key={user.id} className={s.userWrapper}>
      <div>
        <div>
          <img
            src={user.photos.small === null ? userImage : user.photos.small}
          />
        </div>

        <div>
          <button onClick={() => props.toggleFollowed(user.id)}>
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
      <h3>Users</h3>
      {usersEls}
    </div>
  );
};

export default Users;
