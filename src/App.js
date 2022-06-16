import { useState, useReducer, useEffect } from "react";
import "./App.css";
import useDnD from "./hooks/useDnD";
import { useZoom } from "react-easy-hooks";
import { Main, Additional, Container, Modal } from "./components";
import { data, data2, totalCloseCeil, totalOpenCeil } from "./data";
import { v4 as uuidv4 } from "uuid";
import { arrayGenerator } from "./helpers/generator";

function App() {
  const [main, dispatchMainItems] = useReducer(reducer, []);
  const [additional, dispatchAdditionalItems] = useReducer(reducer, []);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const zoom = useZoom();
  const { onMouseDown, onMouseUp, onMouseMove, onMouseEnter, onMouseLeave } =
    useDnD(zoom.zoom, swapHanlder);

  function reducer(state, action) {
    switch (action.type) {
      case "setItems":
        return action.payload;

      default:
        throw new Error();
    }
  }

  /** Must be relocate in listener*/
  useEffect(() => {
    const options = [
      {
        name: "main",
        data: data,
        openCeils: totalOpenCeil,
        closeCeils: totalCloseCeil,
      },
      {
        name: "additional",
        data: data2,
        openCeils: totalOpenCeil,
        closeCeils: totalCloseCeil,
      },
    ];

    const arraysData = arrayGenerator(options);

    dispatchMainItems({ payload: arraysData.main, type: "setItems" });
    dispatchAdditionalItems({
      payload: arraysData.additional,
      type: "setItems",
    });
  }, []);

  function swapHanlder(result) {
    const mainCopy = [...main];
    const additionalCopy = [...additional];
    const arrayData = { main: mainCopy, additional: additionalCopy };

    const {
      cancel,
      drop,
      startID,
      endID,
      startUniqueID,
      endUniqueID,
      startDestination,
      endDestination,
      startIndex: startIdx,
      endIndex: endIdx,
      stack,
    } = result;

    if (cancel || drop) {
      console.log(result);
      return;
    }

    if (startID === endID && stack) {
      let startItem = arrayData[startDestination][startIdx];
      let endItem = arrayData[endDestination][endIdx];

      setIsOpenModal(true);
      setModalData({
        startItemAmount: startItem.amount,
        startItemMaxAmount: startItem.maxAmount,
        endItemAmount: endItem.amount,
        endItemMaxAmount: endItem.maxAmount,
        startDestination,
        endDestination,
        startIdx,
        endIdx,
      });

      return;
    }

    let buffer;

    // console.log("Result :", result);
    // console.log("Start array: ", arrays[result.startDestination]);
    // console.log("Start ID: ", result.startID);
    // console.log("End ID: ", result.endID);
    // console.log("End array: ", arrays[result.endDestination]);

    const startIndex = arrayData[startDestination].findIndex((el) => {
      return el.id === startUniqueID;
    });
    const endIndex = arrayData[endDestination].findIndex((el) => {
      return el.id === endUniqueID;
    });

    buffer = arrayData[startDestination][startIndex];

    arrayData[startDestination][startIndex] =
      arrayData[endDestination][endIndex];

    arrayData[endDestination][endIndex] = buffer;

    dispatchMainItems({ type: "setItems", payload: arrayData["main"] });
    dispatchAdditionalItems({
      type: "setItems",
      payload: arrayData["additional"],
    });
  }

  const handleMouseUp = (e) => {
    let isCanceled = false;
    if (e.target.dataset.droppable === "false") {
      isCanceled = true;
    }

    onMouseUp(e, isCanceled);
  };

  const handleMouseDown = (e) => {
    onMouseDown(e);
  };

  const handleSubmitStack = (count, response) => {
    const { startDestination, endDestination, startIdx, endIdx } = response;
    let arrayData = { main, additional };

    arrayData[startDestination][startIdx].amount =
      arrayData[startDestination][startIdx].amount - count;
    arrayData[endDestination][endIdx].amount =
      arrayData[endDestination][endIdx].amount + count;

    if (arrayData[startDestination][startIdx].amount === 0) {
      arrayData[startDestination] = arrayData[startDestination].map((el) => {
        if (el.id === arrayData[startDestination][startIdx].id) {
          return { id: uuidv4(), status: "open" };
        }
        return el;
      });
    }

    dispatchMainItems({ type: "setItems", payload: arrayData["main"] });
    dispatchAdditionalItems({
      type: "setItems",
      payload: arrayData["additional"],
    });
  };

  return (
    <>
      <div
        className="wrapper"
        data-droppable
        onMouseMove={onMouseMove}
        onMouseUp={handleMouseUp}
        style={{ userSelect: "none" }}
      >
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            onMouseDown={handleMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            zoom={zoom}
          >
            <Main data={main} />
            <Additional data={additional} />
          </Container>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          data={modalData}
          onClose={() => setIsOpenModal(false)}
          onSubmit={handleSubmitStack}
        />
      )}
    </>
  );
}

export default App;
