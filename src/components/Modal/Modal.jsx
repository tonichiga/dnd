import { useState, useMemo } from "react";

const Modal = ({ data, onClose, onSubmit }) => {
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    setCount(e.target.value);
  };

  const maxAmount = useMemo(() => {
    let max;

    if (data.action === "stack") {
      const { startItemAmount, endItemAmount, endItemMaxAmount } = data;

      max = endItemMaxAmount - endItemAmount;
      if (max > startItemAmount) {
        max = startItemAmount;
      }
    } else if (data.action === "split") {
      max = data.amount - 1;
    }
    return max;
  }, [data]);

  return (
    <div style={s.backdrop}>
      <div style={s.paper}>
        <label htmlFor="count" style={s.text}>
          {count}
        </label>
        <input
          id="count"
          style={s.input}
          value={count}
          type="range"
          min={0}
          max={maxAmount}
          onChange={handleChange}
        />
        <div style={s.buttonWrapper}>
          <button
            style={{
              width: 100,
              height: 50,
              marginRight: 5,
              cursor: "pointer",
            }}
            onClick={() => {
              onSubmit(Number(count), data);
              onClose();
            }}
          >
            Ok
          </button>
          <button
            style={{ width: 100, height: 50, cursor: "pointer" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

const s = {
  backdrop: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    width: "100vw",
    height: "100vh",
    transform: "translate(-50%, -50%)",
    background: "#00000080",
    // pointerEvents: "none",
    zIndex: 1000,
  },
  paper: {
    width: 400,
    height: 300,
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    width: "80%",
    height: 60,
  },
  text: {
    fontSize: 24,
    color: "#000",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
