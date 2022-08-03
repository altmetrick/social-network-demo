//Profile
export type PostT = {
  id: string;
  text: string;
  likes: number;
};
export type ContactsT = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};
export type PhotosT = {
  small: string | null;
  large: string | null;
};

export type ProfileDataT = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsT;
  photos: PhotosT;
};

//users

export type UserT = {
  name: string;
  id: number;
  uniqueUrlName: null | string;
  photos: PhotosT;
  status: null | string;
  followed: boolean;
};

//dialogs

export type DialogT = {
  id: number;
  name: string;
};

export type MessageT = {
  id: number;
  text: string;
};
