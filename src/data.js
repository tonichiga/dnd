export const data = [
  {
    status: "fill",
    itemID: 50,
    img: "http://34.117.99.224/serverassets/items/50.png",
    type: "weapon",
  },
  {
    status: "fill",
    itemID: 49,
    img: "http://34.117.99.224/serverassets/items/49.png",
    amount: 30,
    maxAmount: 40,
    type: "ammo",
  },
  {
    status: "fill",
    itemID: 4,
    img: "http://34.117.99.224/serverassets/items/4.png",
    amount: 20,
    maxAmount: 35,
    type: "food",
  },
  {
    status: "fill",
    itemID: 2,
    img: "http://34.117.99.224/serverassets/items/2.png",
    amount: 1,
    maxAmount: 5,
    type: "food",
  },
  {
    status: "fill",
    itemID: 2,
    img: "http://cdn.vrp.maizen.games/serverassets/clothes/62a735b611e2f76a8a13d0c5.png",
    amount: 1,
    // maxAmount: 5,
    type: "clothes",
    wearPos: 1,
    gender: "male", //female, unisex
    strength: 100,
  },
  {
    status: "fill",
    itemID: 2,
    img: "http://cdn.vrp.maizen.games/serverassets/clothes/62a8362288aa2847bb32a236.png",
    amount: 1,
    // maxAmount: 5,
    type: "clothes",
    wearPos: 2,
    gender: "male", //female, unisex
    strength: 100,
  },
  {
    status: "fill",
    itemID: 2,
    img: "http://cdn.vrp.maizen.games/serverassets/clothes/62a8366a88aa2847bb32a246.png",
    amount: 1,
    // maxAmount: 5,
    type: "clothes",
    wearPos: 3,
    gender: "male", //female, unisex
    strength: 100,
  },
];
export const data2 = [
  {
    status: "fill",
    itemID: 50,
    img: "http://34.117.99.224/serverassets/items/50.png",
    type: "weapon",
  },
  {
    status: "fill",
    itemID: 49,
    img: "http://34.117.99.224/serverassets/items/49.png",
    amount: 5,
    maxAmount: 25,
    type: "ammo",
  },
  {
    status: "fill",
    itemID: 4,
    img: "http://34.117.99.224/serverassets/items/4.png",
    amount: 1,
    maxAmount: 10,
    type: "food",
  },
  {
    status: "fill",
    itemID: 2,
    img: "http://34.117.99.224/serverassets/items/2.png",
    amount: 2,
    maxAmount: 4,
    type: "food",
  },
];

export const hotkeysData = [];

export const ALLOWED_LIST = {
  hotkeyAllowed: ["food", "heal", "weapon", "radio"],
  usageAllowed: ["clothes", "food", "heal", "weapon"],
  stackAllowed: ["food", "ammo"],
};

export const PERMANENT_ALLOWED_LIST = ["additional", "main"];

export const WearPositions = {
  masks: 0,
  hats: 0,
  tops: 1,
  legs: 2,
  shoes: 3,
  glasses: 4,
  bodyarmors: 5,
  watches: 6,
  accessories: 6,
  bracelets: 6,
  ears: 6,
  bags: 7,
  // undershirts: 5,
};

export const typeRules = {
  food: {
    hotkey: true,
    main: true,
    additional: true,
    clothes: false,
    stack: true,
    usage: true,
  },
  heal: {
    hotkey: true,
    main: true,
    additional: true,
    clothes: false,
    stack: true,
    usage: true,
  },
  weapon: {
    hotkey: true,
    main: true,
    additional: true,
    clothes: false,
    stack: false,
    usage: true,
  },
  clothes: {
    hotkey: false,
    main: true,
    additional: true,
    clothes: true,
    stack: false,
    usage: true,
  },
  ammo: {
    hotkey: false,
    main: true,
    additional: true,
    clothes: false,
    stack: true,
    usage: false,
  },
  realtyKey: {
    hotkey: false,
    main: true,
    additional: true,
    clothes: false,
    stack: false,
    usage: false,
  },
  vehKey: {
    hotkey: false,
    main: true,
    additional: true,
    clothes: false,
    stack: false,
    usage: false,
  },
  ore: {
    hotkey: false,
    main: true,
    additional: true,
    clothes: false,
    stack: false,
    usage: false,
  },
  item: {
    hotkey: false,
    main: true,
    additional: true,
    clothes: false,
    stack: false,
    usage: false,
  },
};

export const totalOpenCeil = 10;
export const totalCloseCeil = 5;
export const hotkeysTotalOpenCeil = 6;
export const hotkeysTotalCloseCeil = 0;
