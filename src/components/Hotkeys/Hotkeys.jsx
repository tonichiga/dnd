import { Ceil } from "../";

const Hotkeys = ({
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onContextMenu,
  zoom,
  data,
}) => {
  return (
    <div className="container__wrapper hotkey" style={zoom}>
      <div className="container" data-name="hotkeys">
        {data.map((el, index) => {
          let bgStyle = { width: 50, height: 50, zIndex: 100 };

          if (el.status === "fill") {
            bgStyle = {
              width: 100,
              height: 100,
              cursor: "pointer",
              backgroundImage: `url(${el.img})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            };
          } else if (el.status === "open") {
            bgStyle = { ...bgStyle, backgroundColor: "transparent" };
          } else if (el.status === "close") {
            bgStyle = {
              ...bgStyle,
              backgroundColor: "red",
            };
          }

          return (
            <Ceil
              key={el.id}
              style={bgStyle}
              data={el}
              index={index}
              handlers={{
                onMouseDown,
                onMouseEnter,
                onMouseLeave,
                onContextMenu,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hotkeys;
