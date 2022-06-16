import { v4 as uuidv4 } from "uuid";

export const arrayGenerator = (options) => {
  const arrays = options.reduce((prev, acc) => {
    return {
      ...prev,
      [acc.name]: [
        ...acc.data.map((el) => {
          return { ...el, status: "fill", id: uuidv4() };
        }),
        ...Array.apply(null, Array(acc.openCeils)).map(() => {
          return { status: "open", id: uuidv4() };
        }),
        ...Array.apply(null, Array(acc.closeCeils)).map(() => {
          return { status: "close", id: uuidv4() };
        }),
      ],
    };
  }, []);

  return arrays;
};
