import { Code, Flex } from "@chakra-ui/react";
import { FC } from "react";

interface ContractOutputProps {
  contractBody: string;
}

const ContractOutput: FC<ContractOutputProps> = ({ contractBody }) => {
  return (
    <Flex w="full" h="auto">
      <Code display="block" whiteSpace="pre" w="full" p="6" borderRadius="md">
        {contractBody}
      </Code>
    </Flex>
  );
};

export default ContractOutput;
