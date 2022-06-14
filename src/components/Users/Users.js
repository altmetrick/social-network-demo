import s from './Users.module.css';
import userImage from './../../assets/images/User_default_avatar.png';

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
      {pagesEls}
      <h3>Users</h3>
      {usersEls}
    </div>
  );
};

export default Users;
