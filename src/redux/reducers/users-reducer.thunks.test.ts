import { followThC, unfollowThC } from './users-reducer';
import { FollowResType, ResultCodeEnum, usersAPI } from '../../api/api';
import { actions } from './users-reducer';

jest.mock('../../api/api');

const result: FollowResType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {},
};

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

describe('users-reducer test2', () => {
  test('follow thunk success', async () => {
    const thunkFunc = followThC(1);

    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunkFunc(dispatchMock, getStateMock);

    expect(dispatchMock).toBeCalledTimes(3);

    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      actions.toggleFollowingProgressAC(true, 1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      actions.toggleFollowedAC(1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      actions.toggleFollowingProgressAC(false, 1)
    );
  });

  test('unfollow thunk success', async () => {
    const thunkFunc = unfollowThC(1);

    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunkFunc(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);

    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      actions.toggleFollowingProgressAC(true, 1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      actions.toggleFollowedAC(1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      actions.toggleFollowingProgressAC(false, 1)
    );
  });
});
