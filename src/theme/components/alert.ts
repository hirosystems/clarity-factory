const Alert = {
  baseStyle: {
    container: {
      border: "2px",
      borderRadius: "md",
    },
    title: {
      fontWeight: "regular",
      mb: 1,
      color: "gray.100",
    },
    description: {
      color: "gray.200",
    },
    icon: {
      opacity: 0,
      width: 0,
      margin: 0,
    },
  },
  defaultProps: {
    variant: "subtle",
  },
  variants: {
    subtle: (props) => {
      const { colorScheme: c } = props;
      const baseStyles = {
        color: "gray.100",
        border: "2px",
      };
      let colorStyles;
      switch (c) {
        case "red":
          colorStyles = {
            bg: "#4f2e2b",
            borderColor: "red.500",
          };
          break;
        case "green":
          colorStyles = {
            bg: "#2F412E",
            borderColor: "green.200",
          };
          break;
        case "orange":
          colorStyles = {
            bg: "gray.600",
            borderColor: "gold",
          };
          break;
        default:
          colorStyles = {
            bg: "gray.600",
            borderColor: "blue.500",
          };
          break;
      }
      return {
        container: {
          ...baseStyles,
          ...colorStyles,
        },
      };
    },
  },
};

export default Alert;
