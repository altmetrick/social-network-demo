import s from './Users.module.css';

let users = [
  { id: '4', isFollowed: true, fullName: 'JackBone', city: 'New York' },
  { id: '24', isFollowed: false, fullName: 'NickSparrow', city: 'Berlin' },
  { id: '35', isFollowed: true, fullName: 'Marge Simpson', city: 'Barcelona' },
  { id: '45', isFollowed: false, fullName: 'Sally Witt', city: 'Kiev' },
  { id: '55', isFollowed: true, fullName: 'Ted Smith', city: 'Minsk' },
];

const imgURL =
  'https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png';

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers(users);
  }

  let usersEls = props.users.map((user) => (
    <div key={user.id} className={s.userWrapper}>
      <div>
        <div>
          <img src={imgURL} />
        </div>

        <div>
          <button onClick={() => props.toggleIsFollowed(user.id)}>
            {user.isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>

      <div className={s.userBio}>
        <h3>{user.fullName}</h3>
        <h4>{user.city}</h4>
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
