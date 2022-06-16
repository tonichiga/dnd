const Main = ({ onMouseDown, onMouseEnter, onMouseLeave, zoom, data }) => {
  return (
    <div className="container__wrapper" style={zoom}>
      <div className="container" data-name="main">
        {data.map((el, index) => {
          return (
            <div key={el.id} className="ceil" style={{ position: "relative" }}>
              <div
                className="picture"
                data-draggable={el.status === "fill"}
                data-droppable={el.status !== "close"}
                data-index={index}
                data-amount={el?.amount}
                id={el.id}
                data-id={el.itemID}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                  zIndex: 100,
                  width: el.status === "fill" ? 100 : 50,
                  height: el.status === "fill" ? 100 : 50,
                  cursor: el.status === "fill" ? "pointer" : "auto",
                  background:
                    el.status === "fill"
                      ? `url(${el.img})`
                      : el.status === "close"
                      ? "red"
                      : "transparent",

                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <span
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  bottom: 0,
                  right: 5,
                  color: "#fff",
                  fontSize: 10,
                  width: 20,
                  height: 15,
                  borderRadius: 20,
                  background: "#00000020",
                }}
              >
                {el?.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
