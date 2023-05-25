import { Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface InputInfoLabelProps {
  children: ReactNode | ReactNode[];
}

const InputInfoLabel: FC<InputInfoLabelProps> = ({ children }) => {
  return (
    <Text fontFamily="caption" fontSize="xs" color="gray.300" mt="-2">
      {children}
    </Text>
  );
};

export default InputInfoLabel;
