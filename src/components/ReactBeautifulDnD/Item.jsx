import { Text } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

export default function Item({ item, index }) {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <Text
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          align={"left"}
          cursor={"move"}
          w={"300px"}
          h={"30px"}
          m={"5px"}
          p={"5px"}
          bg={"#cacaff"}
          userSelect={"none"}
          outline={"1px dashed brown"}
        >
          {item.text || ""}
        </Text>
      )}
    </Draggable>
  );
}
