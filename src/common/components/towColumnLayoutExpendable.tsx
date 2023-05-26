import { FC, ReactNode, useState } from "react";
import { Box, Button, Flex, Tooltip } from "@chakra-ui/react";
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
  const rightWidth = showOutput ? "55%" : "162px";

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
                bgColor="gray.800"
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
              <Tooltip label="View code" placement="right">
                <Button
                  border="none"
                  bgColor="gray.800"
                  color="gray.300"
                  my="4"
                  borderLeftRadius="none"
                  outline="none"
                  onClick={toggleOutput}
                  leftIcon={<RiArrowLeftSLine />}
                >
                  Code
                </Button>
              </Tooltip>
            )}
          </Box>
          <Box
            h="full"
            pointerEvents={showOutput ? "auto" : "none"}
            opacity={showOutput ? "1" : "0.2"}
          >
            {right}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TwoColumnLayoutExpendable;
