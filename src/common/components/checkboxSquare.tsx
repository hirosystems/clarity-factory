import { Box, Checkbox, CheckboxProps, Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface CheckboxSquareProps extends CheckboxProps {
  label: ReactNode;
}

const CheckboxSquare: FC<CheckboxSquareProps> = ({
  label,
  ...checkboxProps
}) => {
  const { isChecked } = checkboxProps;

  return (
    <Checkbox
      px="16px"
      h="40px"
      align="center"
      border="2px"
      borderColor="gray.500"
      bg={isChecked ? "gray.500" : "none"}
      borderRadius="md"
      whiteSpace="nowrap"
      {...checkboxProps}
    >
      {label}
    </Checkbox>
  );
};

export default CheckboxSquare;
