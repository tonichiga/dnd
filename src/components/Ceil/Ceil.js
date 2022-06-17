const Ceil = ({ style, handlers, data, index }) => {
  return (
    <div className="ceil" style={{ position: "relative" }}>
      <div
        className="picture"
        data-draggable={data.status === "fill"}
        data-droppable={data.status !== "close"}
        data-index={index}
        data-amount={data?.amount}
        data-id={data.itemID}
        data-type={data.type}
        id={data.id}
        onMouseDown={handlers.onMouseDown}
        onMouseEnter={handlers.onMouseEnter}
        onMouseLeave={handlers.onMouseLeave}
        onContextMenu={handlers.onContextMenu}
        style={style}
      ></div>
      {data?.amount > 1 && (
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
          {data?.amount}
        </span>
      )}
    </div>
  );
};

export default Ceil;
