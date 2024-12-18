export default function Button(theme) {
  const setStyle = (ownerStyle) => {
    const isContainedVariant = ownerStyle.variant === 'container';
    const isOutlinedVariant = ownerStyle.variant === 'outlined';
    const isHoverZoomVariant = ownerStyle.variant === 'hoverZoom';

    const isMyColor = ownerStyle.color === 'myColor';

    const defaultStyle = {
      transition: 'all 0.2s ease-in',
      ...(isHoverZoomVariant &&
        isMyColor && {
          backgroundColor: theme.palette[ownerStyle.color]?.main,
        }),
    };

    const focusStyle = {
      '&:focus': {
        outline: 'unset !important',
      },
    };

    const hoverStyle = {
      ...(isHoverZoomVariant &&
        isMyColor && {
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: theme.palette[ownerStyle.color]?.dark,
          },
        }),
    };

    const otherStyle = {};

    return {
      ...defaultStyle,
      ...focusStyle,
      ...hoverStyle,
      ...otherStyle,
    };
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => setStyle(ownerState),
      },
    },
  };
}
