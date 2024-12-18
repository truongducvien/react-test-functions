import { alpha } from '@mui/material';

const PRIMARY = {
  lighter: '#FFAC9F',
  light: '#FF8B78',
  main: '#FE5E44',
  dark: '#FF4021',
  darker: '#FF2400',
  // contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#b9bacb',
  light: '#8a8ca8',
  main: '#5b5d85',
  dark: '#434681',
  darker: '#2F3380',
  abc: '#2f9',
  // contrastText: '#fff',
};

const myColor = (theme) =>
  theme.palette.augmentColor({
    name: 'myColor',
    color: {
      main: '#9909b2',
      dark: '#9909a0',
    },
  });

const palette = (theme) => {
  return {
    primary: PRIMARY,
    secondary: SECONDARY,
    myColor: {
      main: '#9909b2',
      dark: '#9909a0',
    },
    // myColor: myColor(theme),
    action: {
      hover: '#88888b',
      focus: alpha('#fff', 0.1),
    },
  };
};

export default palette;
