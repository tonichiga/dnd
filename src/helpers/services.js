import { v4 as uuidv4 } from "uuid";
import { ALLOWED_LIST, PERMANENT_ALLOWED_LIST } from "../data";

const getItems = (startID, endID, arr) => {
  const startItem = arr.find((el) => el.id === startID);
  const endItem = arr.find((el) => el.id === endID);

  return { startItem, endItem };
};

const findItem = (entryID, items) => {
  const item = items.find((el) => el.id === entryID);

  return item;
};

const swapping = (arrays, params) => {
  const { startUniqueID, endUniqueID, startDestination, endDestination } =
    params;
  let buffer;

  const startIndex = arrays[startDestination].findIndex((el) => {
    return el.id === startUniqueID;
  });
  const endIndex = arrays[endDestination].findIndex((el) => {
    return el.id === endUniqueID;
  });

  buffer = arrays[startDestination][startIndex];
  arrays[startDestination][startIndex] = arrays[endDestination][endIndex];
  arrays[endDestination][endIndex] = buffer;

  return arrays;
};

const setDefaultObject = (arrays, params) => {
  const { startDestination, startIndex } = params;

  arrays[startDestination] = arrays[startDestination].map((el) => {
    if (el.id === arrays[startDestination][startIndex].id) {
      return { id: uuidv4(), status: "open" };
    }
    return el;
  });

  return arrays;
};

const createNewObjectWithAmount = (array, count, params) => {
  console.log("Before split", array);

  for (let i = 0; i < array.length; i += 1) {
    console.log("status :", array[i].status);
    if (array[i].status === "open") {
      array[i] = {
        ...array[i],
        status: "fill",
        itemID: params.itemID,
        amount: count,
        maxAmount: params.maxAmount,
        img: params.img,
      };
      break;
    }
  }
  return array;
};

const amountDecrement = (arrays, count, params) => {
  const { startDestination, endDestination, startIndex, endIndex } = params;

  arrays[startDestination][startIndex].amount =
    arrays[startDestination][startIndex].amount - count;
  arrays[endDestination][endIndex].amount =
    arrays[endDestination][endIndex].amount + count;

  if (arrays[startDestination][startIndex].amount === 0) {
    arrays = setDefaultObject(arrays, params);
  }

  return arrays;
};

const amountSplit = (array, count, params) => {
  array = array.map((el) => {
    if (el.id === params.id) {
      return { ...el, amount: el.amount - count };
    }
    return el;
  });

  array = createNewObjectWithAmount(array, count, params);

  return array;
};

const compareDestinationRules = (endDestination, type) => {
  if (endDestination === "additional" || endDestination === "main") {
    return true;
  }

  return false;
};

const compareSwapRules = (type, action) => {
  return ALLOWED_LIST[action].include(type);
};

export {
  amountDecrement,
  getItems,
  findItem,
  swapping,
  amountSplit,
  compareDestinationRules,
  compareSwapRules,
};
