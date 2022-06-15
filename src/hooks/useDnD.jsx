import { useRef } from "react";

const useDnD = (scale, responseCallback, transformDragMode = true) => {
  const isMouseDown = useRef(false);
  const draggableItemRef = useRef(null);
  const hoverItemRef = useRef(null);
  const offSetTop = useRef();
  const offSetLeft = useRef();

  const onMouseDown = (e) => {
    isMouseDown.current = true;

    if (e.target.dataset.draggable !== "true") return;
    draggableItemRef.current = e.target;

    const pictureoffsetY = draggableItemRef.current.clientHeight / 2;
    const pictureoffsetX = draggableItemRef.current.clientWidth / 2;

    offSetTop.current = e.clientY / scale - pictureoffsetY;
    offSetLeft.current = e.clientX / scale - pictureoffsetX;

    if (!transformDragMode) {
      draggableItemRef.current.style.position = "absolute";
    }
    draggableItemRef.current.style.pointerEvents = "none";
  };

  const onMouseUp = (e) => {
    isMouseDown.current = false;

    const draggableItem = draggableItemRef.current;
    const hoverItem = hoverItemRef.current;

    if (!draggableItem) return;

    const result = swapItemInDOM(hoverItem, draggableItem);

    responseCallback(result);

    // dataAttr.forEach((nodeContainer, index) => {
    //   nodeContainer.childNodes.forEach((ceil) => {
    //     console.log(ceil.lastChild.id);
    //     if (Array.isArray(result[index])) {
    //       result[index] = [...result[index], { id: ceil.lastChild.id }];
    //     } else {
    //       result[index] = [{ id: ceil.lastChild.id }];
    //     }
    //   });
    // });

    draggableItem.style.position = "static";
    draggableItem.style.pointerEvents = "auto";
    draggableItem.style.cursor = "pointer";
    draggableItemRef.current.style.top = "unset";
    draggableItemRef.current.style.left = "unset";
    draggableItem.style.transform = "none";

    hoverItemRef.current = null;
    draggableItemRef.current = null;
  };

  const onMouseMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isMouseDown.current) return;
    if (!draggableItemRef.current) return;

    const draggableItem = draggableItemRef.current;
    const pictureoffsetY = draggableItemRef.current.clientHeight / 2;
    const pictureoffsetX = draggableItemRef.current.clientWidth / 2;

    if (transformDragMode) {
      /** Variant 1 fast performance */

      draggableItem.style.transform = `translate(${
        e.clientX / scale - offSetLeft.current - pictureoffsetX + "px"
      },${e.clientY / scale - offSetTop.current - pictureoffsetY + "px"})`;
      draggableItem.style.pointerEvents = "none";
    } else {
      /** Variant 1 medium performance */

      draggableItem.style.left = e.clientX / scale - pictureoffsetX + "px";
      draggableItem.style.top = e.clientY / scale - pictureoffsetY + "px";
    }
  };

  const onMouseEnter = (e) => {
    const node = e.target;
    if (!isMouseDown.current) return;
    if (node.dataset === "close") return;

    hoverItemRef.current = node;
  };

  const onMouseLeave = (e) => {
    hoverItemRef.current = null;
  };

  function swapItemInDOM(node1, node2) {
    if (!node1 || !node2) return;

    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);

    const obj = {
      startDestination: node1.parentNode.parentNode.dataset.name,
      startIndex: node1.id,
      endDestination: node2.parentNode.parentNode.dataset.name,
      endIndex: node2.id,
    };

    return obj;
  }

  function swapItemInArray(activeItemID, hoverItemID, array) {
    if (!activeItemID || !hoverItemID) return;

    const startIndex = array.findIndex((el) => el.id === Number(activeItemID));
    const endIndex = array.findIndex((el) => el.id === Number(hoverItemID));

    let buffer = array[startIndex];
    array[startIndex] = array[endIndex];
    array[endIndex] = buffer;

    const newArr = [...array];

    return newArr;
  }

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    swapItemInArray,
    swapItemInDOM,
  };
};

export default useDnD;
