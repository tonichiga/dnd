import { useState } from "react";
import { data } from "../../data";

const Additional = ({ onMouseDown, onMouseEnter, onMouseLeave, zoom }) => {
  // eslint-disable-next-line
  const [items, setItems] = useState(data);

  return (
    <div className="container__wrapper" style={zoom}>
      <div className="container" data-name="main">
        {items.map((el) => {
          return (
            <div key={el.id} className="ceil">
              <div
                className="picture"
                data-draggable={el.status === "fill"}
                id={el.id}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                  width: 100,
                  height: 100,
                  cursor: el.status === "fill" ? "pointer" : "auto",
                  backgroundImage:
                    el.status === "fill" ? `url(${el.img})` : "transparent",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Additional;
