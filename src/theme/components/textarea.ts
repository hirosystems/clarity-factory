const TextArea = {
  baseStyle: {},
  sizes: {
    md: {
      field: {
        fontSize: "14px",
      },
    },
  },
  variants: {
    filled: {
      bg: "gray.500",
      color: "gray.100",
      _hover: {
        bg: "gray.500",
      },
      _focus: {
        bg: "gray.500",
        borderWidth: "1px",
        borderColor: "gray.300",
      },
      _placeholder: {
        color: "gray.300",
      },
      _disabled: {
        opacity: 1,
        bg: "gray.800",
        borderStyle: "dashed",
        borderWidth: "1px",
        borderColor: "gray.400",
        _hover: {
          bg: "gray.800",
        },
        _placeholder: {
          color: "gray.300",
        },
      },
    },
  },
  defaultProps: {
    variant: "filled",
  },
};

export default TextArea;
