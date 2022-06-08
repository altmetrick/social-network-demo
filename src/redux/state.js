const state = {
  profilePage: {
    posts: [
      { id: '1', text: 'My first post', likes: 1 },
      { id: '2', text: "What's up, man, today...", likes: 12 },
      { id: '3', text: 'Jack of all trades master of none', likes: 13 },
      { id: '4', text: 'Lorem ipsum Ola ', likes: 16 },
    ],
  },
  messagesPage: {
    dialogs: [
      { id: 1, name: 'Jack' },
      { id: 2, name: 'Nick' },
      { id: 3, name: 'Jess' },
      { id: 4, name: 'Ket' },
      { id: 5, name: 'Sam' },
    ],
    messages: [
      { id: 1, text: 'Hello kdfsdf' },
      { id: 2, text: 'HOw are you bro ' },
      { id: 3, text: 'Hi Jack' },
      { id: 4, text: 'Hey hey hey' },
      { id: 5, text: 'Ola Ola Ola' },
    ],
  },
};

export const addPost = (postText) => {
  let post = {
    id: '11',
    text: postText,
  };

  state.profilePage.posts.push(post);
  console.log(state);
};

export default state;
