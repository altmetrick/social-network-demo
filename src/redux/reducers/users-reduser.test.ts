import { StateT } from './users-reducer';
import { actions } from './users-reducer';
import usersReducer from './users-reducer';

//1arrange
let state: StateT;

beforeEach(() => {
  state = {
    users: [
      {
        name: 'TestUser 0',
        id: 0,
        followed: false,
        uniqueUrlName: null,
        photos: { small: null, large: null },
        status: null,
      },
      {
        name: 'TestUser 1',
        id: 1,
        followed: true,
        uniqueUrlName: null,
        photos: { small: null, large: null },
        status: null,
      },
      {
        name: 'TestUser 2',
        id: 2,
        followed: false,
        uniqueUrlName: null,
        photos: { small: null, large: null },
        status: null,
      },
      {
        name: 'TestUser 3',
        id: 3,
        followed: true,
        uniqueUrlName: null,
        photos: { small: null, large: null },
        status: null,
      },
    ],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingProgress: [],
    filter: {
      term: '',
      friend: null,
    },
  };
});

describe('users-reducer test', () => {
  test('toggle followed: follow false->true ', () => {
    //2act
    const newState = usersReducer(state, actions.toggleFollowedAC(2));

    //3assert
    expect(newState.users[0].followed).toBeFalsy();

    expect(newState.users[2].followed).toBeTruthy();
  });

  test('toggle followed: unfollow true->false', () => {
    const newState = usersReducer(state, actions.toggleFollowedAC(3));

    expect(newState.users[3].followed).toBeFalsy();
  });
});
