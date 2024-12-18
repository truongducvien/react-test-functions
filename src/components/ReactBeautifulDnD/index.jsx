import { Text, VStack } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DATA } from "./data";
import { useState } from "react";
import Item from "./Item";

const ReactBeautifulDnD = () => {
  const [items, setItems] = useState([...DATA]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (result.destination && source.index !== destination.index) {
      const newItems = [...items];
      const draggedIndex = source.index;
      const draggedItem = newItems[draggedIndex];
      const targetIndex = destination.index;
      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);
      setItems(newItems);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <VStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            p={"10px"}
            border={"1px solid"}
          >
            <Text>React - Beautiful - DnD</Text>
            {items.map((item, index) => (
              <Item key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReactBeautifulDnD;
