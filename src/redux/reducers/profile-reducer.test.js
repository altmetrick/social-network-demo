import profileReducer, { actions } from './profile-reducer';
import usersReducer from './users-reducer';

const initialState = {
  posts: [
    { id: '1', text: 'My first post', likes: 1 },
    { id: '2', text: "What's up, man, today...", likes: 12 },
    { id: '3', text: 'Jack of all trades master of none', likes: 13 },
    { id: '4', text: 'Lorem ipsum Ola ', likes: 16 },
  ],
  userProfileData: null,
  userStatus: '',
};

describe('Users Reducers', () => {
  test('The length of posts should be incremented', () => {
    let res = profileReducer(initialState, {
      type: 'profile/ADD_POST',
      postText: 'hello',
    });

    expect(res.posts.length).toBe(5);
  });

  test('The length of posts should be Decremented', () => {
    let action = actions.deletePostAC(2);
    let res = profileReducer(initialState, action);

    expect(res.posts.length).toBe(3);
  });
});
