import { Text, VStack } from "@chakra-ui/react";
import { DATA } from "./data";
import Item from "./item";
import { useState } from "react";

export default function Container() {
  const [items, setItems] = useState([...DATA]);

  const moveItem = (draggedId, targetIndex) => {
    const newItems = [...items];
    const draggedIndex = newItems.findIndex(it => it.id === draggedId);
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem)
    setItems(newItems)
  }

  return (
    <VStack p={'10px'} border={'1px solid'}>
      <Text>React - DnD</Text>
      {items.map((item, index) => (
        <Item key={item.id} index={index} item={item} moveItem={moveItem}/>
      ))}
    </VStack>
  )
}
