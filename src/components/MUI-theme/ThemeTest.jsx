import { HStack, VStack } from '@chakra-ui/react';
import { Button } from '@mui/material';
import { useThemeContext } from './MUIThemeProvider';

export default function ThemeTest() {
  const { setMode } = useThemeContext();

  return (
    <VStack>
      {/* Palette */}
      <HStack gap={'10px'}>
        <Button variant="contained" onClick={() => setMode('light')}>
          Light mode
        </Button>
        <Button
          variant="hoverZoom"
          color="myColor"
          // sx={{ bgcolor: 'myColor.light' }}
          onClick={() => setMode('dark')}
        >
          Dark mode
        </Button>
        <Button variant="contained" color="secondary">
          Contained button
        </Button>
        <Button variant="outlined" sx={{ color: 'secondary.abc' }}>
          Outlined button
        </Button>
        <Button variant="outlined" color="secondary">
          Outlined button
        </Button>
      </HStack>

      {/* Typography  */}
    </VStack>
  );
}
