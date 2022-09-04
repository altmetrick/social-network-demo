import { RootStateT } from '../redux-store';

export const getUserId = (state: RootStateT) => state.authData.userId;
