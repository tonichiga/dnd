import { useState, useReducer, useEffect } from "react";
import "./App.css";
import useDnD from "./hooks/useDnD";
import { useZoom } from "react-easy-hooks";
import {
  Main,
  Additional,
  Container,
  Modal,
  Hotkeys,
  Clothes,
} from "./components";
import {
  data,
  data2,
  hotkeysData,
  totalCloseCeil,
  totalOpenCeil,
  hotkeysTotalOpenCeil,
  hotkeysTotalCloseCeil,
  clothesData,
  clothesTotalOpenCeil,
  clothesTotalCloseCeil,
  typeRules,
} from "./data";
import { arrayGenerator } from "./helpers/generator";
import {
  amountDecrement,
  swapping,
  findItem,
  amountSplit,
  compareDestinationRules,
  compareSwapRules,
} from "./helpers/services";

function App() {
  const [main, dispatchMainItems] = useReducer(reducer, []);
  const [additional, dispatchAdditionalItems] = useReducer(reducer, []);
  const [hotkeys, dispatchHotkeysItems] = useReducer(reducer, []);
  const [clothes, dispatchClothesItems] = useReducer(reducer, []);

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
      {
        name: "hotkeys",
        data: hotkeysData,
        openCeils: hotkeysTotalOpenCeil,
        closeCeils: hotkeysTotalCloseCeil,
      },
      {
        name: "clothes",
        data: clothesData,
        openCeils: clothesTotalOpenCeil,
        closeCeils: clothesTotalCloseCeil,
      },
    ];

    const arraysData = arrayGenerator(options);

    dispatchMainItems({ payload: arraysData.main, type: "setItems" });
    dispatchAdditionalItems({
      payload: arraysData.additional,
      type: "setItems",
    });
    dispatchHotkeysItems({
      payload: arraysData.hotkeys,
      type: "setItems",
    });
    dispatchClothesItems({
      payload: arraysData.clothes,
      type: "setItems",
    });
  }, []);

  /* Main inventory logic **/
  function swapHanlder(result) {
    const mainCopy = [...main];
    const additionalCopy = [...additional];
    const hotkeysCopy = [...hotkeys];
    const clothesCopy = [...clothes];

    let arrayData = {
      main: mainCopy,
      additional: additionalCopy,
      hotkeys: hotkeysCopy,
      clothes: clothesCopy,
    };

    const {
      cancel,
      drop,
      startID,
      endID,
      startDestination,
      endDestination,
      startIndex,
      endIndex,
      stack,
      endElementDataset,
      startElementDataset,
    } = result;

    if (cancel || drop) {
      console.log(result);
      return;
    }

    console.log({
      startDestination,
      endDestination,
      startIndex,
      endIndex,
      stack,
      endElementDataset,
      startElementDataset,
    });

    if (!typeRules[startElementDataset.type][endDestination]) return;

    if (typeRules[endElementDataset.type]) {
      console.log({
        startType: startElementDataset.type,
        endType: endElementDataset.type,
        startItem: typeRules[startElementDataset.type],
        endItem: typeRules[endElementDataset.type],
      });
      if (
        !typeRules[startElementDataset.type][endDestination] ||
        !typeRules[endElementDataset.type][startDestination]
      ) {
        return;
      }
    }

    if ((startID === endID && stack) || false) {
      // if (!compareDestinationRules(endDestination, endElementDataset.type)) {
      //   console.log("Swap is not allowed");
      //   return;
      // }

      // if (!compareSwapRules(startElementDataset.type, "hotkeyAllowed")) {
      //   console.log("Swap rules is not allowed");
      //   return;
      // }

      setIsOpenModal(true);
      setModalData({
        action: "stack",
        startItemAmount: arrayData[startDestination][startIndex].amount,
        startItemMaxAmount: arrayData[startDestination][startIndex].maxAmount,
        endItemAmount: arrayData[endDestination][endIndex].amount,
        endItemMaxAmount: arrayData[endDestination][endIndex].maxAmount,
        startDestination,
        endDestination,
        startIndex,
        endIndex,
      });

      return;
    }

    arrayData = swapping(arrayData, result);

    dispatchMainItems({ type: "setItems", payload: arrayData["main"] });
    dispatchAdditionalItems({
      type: "setItems",
      payload: arrayData["additional"],
    });
    dispatchHotkeysItems({
      payload: arrayData["hotkeys"],
      type: "setItems",
    });
    dispatchClothesItems({
      payload: arrayData["clothes"],
      type: "setItems",
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
    if (e.button !== 0) return;
    onMouseDown(e);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    let arrays = { main, additional, hotkeys, clothes };
    const id = e.target.id;
    const arrayName = e.target.parentNode.parentNode.dataset.name;

    const item = findItem(id, arrays[arrayName]);

    if (item.status !== "fill") return;

    const index = arrays[arrayName].findIndex((el) => el.id === item.id);

    if (item.amount <= 1) return;
    setIsOpenModal(true);
    setModalData({
      action: "split",
      ...item,
      amount: item.amount,
      maxAmount: item.maxAmount,
      arrayName,
      index,
    });
  };

  const handleSubmitStack = (count, params) => {
    let arrayData = { main, additional, hotkeys, clothes };

    if (params.action === "stack") {
      arrayData = amountDecrement(arrayData, count, params);
    }

    if (params.action === "split") {
      const resultArray = amountSplit(
        arrayData[params.arrayName],
        count,
        params
      );
      arrayData[params.arrayName] = resultArray;
    }

    dispatchMainItems({ type: "setItems", payload: arrayData["main"] });
    dispatchAdditionalItems({
      type: "setItems",
      payload: arrayData["additional"],
    });
    dispatchHotkeysItems({
      payload: arrayData["hotkeys"],
      type: "setItems",
    });
    dispatchClothesItems({
      payload: arrayData["clothes"],
      type: "setItems",
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
            onContextMenu={handleContextMenu}
            zoom={zoom}
          >
            <Clothes data={clothes} />
            <Main data={main} />
            <Additional data={additional} />
            <Hotkeys data={hotkeys} />
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
