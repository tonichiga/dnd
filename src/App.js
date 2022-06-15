import "./App.css";
import useDnD from "./hooks/useDnD";
import { useZoom } from "react-easy-hooks";
import { Main, Additional, Container } from "./components";

function App() {
  const zoom = useZoom();
  const { onMouseDown, onMouseUp, onMouseMove, onMouseEnter, onMouseLeave } =
    useDnD(zoom.zoom, swapHanlder);

  function swapHanlder(result) {
    console.log(result);
  }

  return (
    <div
      className="wrapper"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
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
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          zoom={zoom}
        >
          <Main />
          <Additional />
        </Container>
      </div>
    </div>
  );
}

export default App;
