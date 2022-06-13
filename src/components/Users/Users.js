import s from './Users.module.css';
import userImage from './../../assets/images/User_default_avatar.png';

import React from 'react';

import axios from 'axios';

class Users extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then((res) => {
          this.props.setUsers(res.data.items);
        });
    }
  }

  render() {
    let usersEls = this.props.users.map((user) => (
      <div key={user.id} className={s.userWrapper}>
        <div>
          <div>
            <img
              src={user.photos.small === null ? userImage : user.photos.small}
            />
          </div>

          <div>
            <button onClick={() => this.props.toggleFollowed(user.id)}>
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
  }
}

export default Users;
