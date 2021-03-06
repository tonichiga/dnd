import { Ceil } from "../";

const Additional = ({
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onContextMenu,
  data,
  zoom,
}) => {
  return (
    <div className="container__wrapper" style={zoom}>
      <div className="container" data-name="additional">
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

export default Additional;
