const table = {
  baseStyle: {
    table: {
      borderCollapse: "initial",
      borderSpacing: "0 2px",
    },
    th: {
      color: "gray.300",
      fontSize: "10px",
      borderBottom: "0",
      py: "2",
    },
    td: {
      borderBottom: "0",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      verticalAlign: "middle",
      marginBottom: "2px",
    },
    thead: {
      th: {
        borderColor: "transparent",
        color: "gray.300",
        fontWeight: "600",
        fontSize: "10px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      },
    },
    tbody: {
      color: "white",
      fontFamily: "caption",
      tr: {
        _hover: {
          td: {
            backgroundColor: "gray.500",
          },
        },
        td: {
          borderColor: "transparent",
          backgroundColor: "gray.600",
          transition: "all 250ms ease-out",
          "&:first-of-type": {
            borderTopLeftRadius: "md",
            borderBottomLeftRadius: "md",
          },
          "&:last-of-type": {
            borderTopRightRadius: "md",
            borderBottomRightRadius: "md",
          },
        },
      },
    },
  },
  variants: {
    large: {
      table: {
        borderSpacing: "0 8px",
      },
      td: {
        py: "24px",
      },
    },
  },
};

export default table;
