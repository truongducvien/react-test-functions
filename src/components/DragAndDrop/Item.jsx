import { Text } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";

const ACCEPT_DROP_TYPE = 'item'

export default function  Item ({ item, index, moveItem }) {
  const [{isDragging}, drag] = useDrag({
    type: ACCEPT_DROP_TYPE,
    item: {id: item.id, index, title: item.text},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }, [item.id, index])

  const [, drop] = useDrop(() => ({
    accept: ACCEPT_DROP_TYPE,
    hover: (draggedItem) => {
      // if (!monitor.isOver()){
        moveItem(draggedItem.id, index);
      // }
    },
  }), [index, moveItem])

  return (

    <Text 
      ref={node => drag(drop(node))}
      align={'left'}
      cursor={'move'}
      opacity={isDragging? 0 : 1}
      w={'300px'}
      h={'30px'}
      m={'5px'}
      p={'5px'}
      bg={'#cacaff'}
      userSelect={'none'}
      outline={'1px dashed brown'}
    >{item.text || ''}</Text>
  )
}
