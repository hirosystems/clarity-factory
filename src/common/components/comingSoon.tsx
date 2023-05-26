import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

interface ComingSoonProps {
  width?: string;
}
const ComingSoon: FC<ComingSoonProps> = ({ width }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      color="gray.300"
      letterSpacing="0.19em"
      fontFamily="caption"
      gap="5"
      w={width || "200px"}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <img key={i} src={`/comingSoon/${i}.png`} />
      ))}
    </Flex>
  );
};

export default ComingSoon;
