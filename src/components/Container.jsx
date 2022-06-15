import { Children, cloneElement } from "react";

const Container = (props) => {
  return (
    <>
      {Children.map(props.children, (child) => {
        return cloneElement(child, {
          ...props,
        });
      })}
    </>
  );
};

export default Container;
