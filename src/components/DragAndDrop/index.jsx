import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";
// import DragLayer from "./DragLayer";

const DragAndDrop = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
      {/* <DragLayer /> */}
    </DndProvider>
  )
}

export default DragAndDrop;