const Modal = {
  baseStyle: {
    dialog: {
      color: "gray.100",
      bg: "gray.600",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) !important",
      mt: "0",
    },
    header: {
      fontFamily: "caption",
      px: "7",
      pt: "7",
      pb: "3",
    },
    body: {
      px: "7",
      py: "3",
    },
    footer: {
      px: "7",
      pb: "7",
      pt: "3",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      button: {
        w: "full",
      },
    },
  },
};

export default Modal;
