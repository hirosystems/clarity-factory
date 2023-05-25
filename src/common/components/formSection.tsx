import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

interface FormSectionProps {
  label: string;
  children: ReactNode | ReactNode[];
  startExpanded?: boolean;
}

const FormSection: FC<FormSectionProps> = ({
  label,
  children,
  startExpanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(!!startExpanded);

  const handleToggleExpanded = () => {
    setIsExpanded((e) => !e);
  };

  return (
    <Box bg="gray.900" borderRadius="md">
      <Flex
        as="button"
        w="full"
        onClick={handleToggleExpanded}
        height="65px"
        px="28px"
        align="center"
        justify="space-between"
      >
        <Heading color="gray.300" size="5">
          {label}
        </Heading>
        <Icon
          as={isExpanded ? AiFillMinusCircle : AiFillPlusCircle}
          boxSize="5"
          color="gray.400"
        />
      </Flex>
      {isExpanded && (
        <Box px="28px" pb="28px">
          {children}
        </Box>
      )}
    </Box>
  );
};

export default FormSection;
