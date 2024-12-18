import { Box, Text } from "@chakra-ui/react";
import { useDragLayer } from "react-dnd";

const DragLayer = () => {
  const { item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset()
  }))

  return (
    <Box zIndex={100} pointerEvents={'none'} position={'fixed'} top={0} left={0}>
      {currentOffset && (
        <Text 
          align={'left'}
          cursor={'move'}
          w={'300px'}
          h={'30px'}
          m={'5px'}
          p={'5px'}
          bg={'yellow'}
          userSelect={'none'}
          outline={'1px dashed brown'}
          transform={`translate(${currentOffset.x}px,${currentOffset.y}px)`}
        >{item.title}</Text>
      )} 
    </Box>
  )
}

export default DragLayer;