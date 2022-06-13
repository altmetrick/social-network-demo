import s from './Users.module.css';
import userImage from './../../assets/images/User_default_avatar.png';

import React from 'react';

import axios from 'axios';

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((res) => {
        this.props.setUsers(res.data.items);
        //this.props.setTotalUsersCount(res.data.totalCount);
        this.props.setTotalUsersCount(150);
      });
  }

  onPageChanged = (pageNum) => {
    this.props.setCurrentPage(pageNum);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNum}`
      )
      .then((res) => {
        this.props.setUsers(res.data.items);
      });
  };

  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    let pagesEls = pages.map((page) => (
      <span
        className={page === this.props.currentPage ? s.selected : ' '}
        onClick={() => {
          this.onPageChanged(page);
        }}
      >
        {page}
      </span>
    ));

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
        {pagesEls}
        <h3>Users</h3>
        {usersEls}
      </div>
    );
  }
}

export default Users;
