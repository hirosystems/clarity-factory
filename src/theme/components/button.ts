const Button = {
  baseStyle: {
    color: "gray.100",
    fontWeight: "500",
    letterSpacing: "-0.01em",
    fontSize: "14px",
    transition: "all 150ms ease-out",
  },
  variants: {
    primary: {
      bg: "orange.500",
      color: "black",
      border: "none",
      _hover: {
        bg: "orange.600",
      },
      _active: {
        boxShadow: "outlineGray500",
      },
      _focus: {
        boxShadow: "outlineGray500",
      },
      _disabled: {
        bg: "gray.300",
        boxShadow: "none",
        color: "gray.500",
        pointerEvents: "none",
      },
    },
    secondary: {
      border: "2px",
      borderColor: "gray.500",
      _hover: {
        bg: "gray.500",
      },
      _focus: {
        bg: "gray.500",
        boxShadow: "outlineGray600",
      },
      _active: {
        bg: "gray.500",
        boxShadow: "outlineGray600",
      },
      _disabled: {
        borderColor: "transparent",
        pointerEvents: "none",
      },
    },
    secondaryLight: {
      bg: "none",
      color: "gray.100",
      border: "2px",
      borderColor: "gray.400",
      _hover: {
        bg: "gray.400",
      },
      _focus: {
        bg: "gray.400",
        boxShadow: "outlineGray500",
      },
      _active: {
        bg: "gray.400",
        boxShadow: "outlineGray500",
      },
      _disabled: {
        borderColor: "transparent",
        pointerEvents: "none",
      },
    },
    link: {
      bg: "none",
      color: "gray.300",
      textDecoration: "underline",
      textDecorationThickness: "2px",
      textDecorationColor: "gray.400",
      textUnderlineOffset: "5px",
      px: "2.5",
      _hover: {
        textDecorationColor: "gray.300",
      },
      _active: {
        color: "gray.100",
        textDecorationColor: "gray.300",
      },
      _focus: {
        color: "gray.100",
        textDecorationColor: "gray.300",
      },
    },
    linkLight: {
      bg: "none",
      color: "gray.100",
      textDecoration: "underline",
      textDecorationThickness: "2px",
      textDecorationColor: "gray.400",
      textUnderlineOffset: "5px",
      px: "2.5",
      _hover: {
        color: "gray.100",
        textDecorationColor: "gray.200",
      },
      _focus: {
        color: "gray.100",
        textDecorationColor: "gray.200",
      },
      _active: {
        color: "gray.100",
        textDecorationColor: "gray.200",
      },
    },
    transparent: {
      border: "none",
      bg: "none",
      _disabled: {
        pointerEvents: "none",
      },
    },
  },
  sizes: {
    md: {
      fontSize: "sm",
    },
  },
  defaultProps: {
    variant: "secondary",
  },
};

export default Button;
