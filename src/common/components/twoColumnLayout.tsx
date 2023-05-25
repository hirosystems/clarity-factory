import { FC, ReactNode, useState } from "react";
import { Flex } from "@chakra-ui/react";

interface TwoColumnLayoutProps {
  left: ReactNode | ReactNode[];
  right: ReactNode | ReactNode[];
}

const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({ left, right }) => {
  return (
    <Flex as="main" h="100vh" minW="900px">
      <Flex overflowY="scroll" p="4" basis="50%" grow="0" shrink="0">
        {left}
      </Flex>
      <Flex overflowY="scroll" p="4" basis="50%" grow="0" shrink="0">
        {right}
      </Flex>
    </Flex>
  );
};

export default TwoColumnLayout;
