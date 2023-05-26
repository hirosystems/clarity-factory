import { FC, ReactNode, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface TwoColumnLayoutExpendableProps {
  left: ReactNode | ReactNode[];
  right: ReactNode | ReactNode[];
  showOutput?: boolean;
  toggleOutput: () => void;
}

const TwoColumnLayoutExpendable: FC<TwoColumnLayoutExpendableProps> = ({
  left,
  right,
  showOutput,
  toggleOutput,
}) => {
  // when visible, make it lsightly more than half
  // to avoid horizontal scrolling in the code
  const rightWidth = showOutput ? "55%" : "100px";

  return (
    <Flex as="main" h="100vh">
      <Flex overflowY="scroll" p="4" grow="1">
        {left}
      </Flex>
      <Flex overflowY="scroll" p="4" width={rightWidth} grow="0" shrink="0">
        <Flex
          w="full"
          h="auto"
          bg="gray.900"
          borderRadius="md"
          flexDirection="column"
        >
          <Box>
            {showOutput ? (
              <Button
                border="none"
                bgColor="gray.700"
                color="gray.300"
                marginY={4}
                borderLeftRadius="none"
                outline="none"
                onClick={toggleOutput}
                leftIcon={<RiArrowRightSLine />}
              >
                {"Hide code"}
              </Button>
            ) : (
              <Button
                border="none"
                bgColor="gray.700"
                color="gray.300"
                marginY={4}
                marginLeft={2}
                outline="none"
                onClick={toggleOutput}
                leftIcon={<RiArrowLeftSLine />}
              />
            )}
          </Box>
          {showOutput ? right : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TwoColumnLayoutExpendable;
