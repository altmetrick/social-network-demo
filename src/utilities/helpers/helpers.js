export const matchKeysToMessages = (obj, arr) => {
  let res = {};

  for (const key in obj) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase().includes(key)) {
        res[key] = arr[i];
        break;
      }
    }
  }

  return res;
};
