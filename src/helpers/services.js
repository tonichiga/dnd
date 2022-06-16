export const getItems = (startID, endID, arr) => {
  const startItem = arr.find((el) => el.id === startID);
  const endItem = arr.find((el) => el.id === endID);

  return { startItem, endItem };
};

export const findItem = (entryID, items) => {
  const item = items.find((el) => el.id === entryID);

  return item;
};
