import Head from "next/head";
import { Box, Flex, Text } from "@chakra-ui/layout";
import TwoColumnLayout from "../common/components/twoColumnLayout";
import { Button, Icon, Input, Tooltip } from "@chakra-ui/react";
import { IoIosShuffle } from "react-icons/io";
import { useState } from "react";
import ComingSoon from "../common/components/comingSoon";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import Link from "next/link";

export default function Home() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showContractPreview, setShowContractPreview] = useState(false);

  const [creatingContract, setCreatingContract] = useState(false);
  const [creatingTemplate, setCreatingTemplate] = useState<"nft" | "ft" | null>(
    null
  );

  const [contractName, setContractName] = useState("");

  const handleCreateContractClick = (template) => {
    setCreatingContract(true);
    setCreatingTemplate(template);
    setContractName("");
  };

  const handleContractNameChange = (e) => {
    setContractName(e.target.value);
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const getRandomCharacter = () =>
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const handleGenerateRandomName = () => {
    let randomName =
      creatingTemplate === "nft"
        ? uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            separator: "-",
          })
        : `${getRandomCharacter()}${getRandomCharacter()}${getRandomCharacter()}`.toUpperCase();
    setContractName(randomName);
  };

  return (
    <div>
      <Head>
        <title>Clarity Maker</title>
      </Head>

      <TwoColumnLayout
        left={
          <Flex
            direction="column"
            justify="space-between"
            align="center"
            h="full"
            w="full"
          >
            <Flex grow="1" direction="column" justify="center">
              <Flex direction="column" gap="12" align="center">
                <Flex direction="column" gap="6" align="center">
                  <Box w="400px">
                    <Link href="/" onClick={() => setCreatingContract(false)}>
                      <img aria-hidden src="/hiroMakerLogo.png" />
                    </Link>
                  </Box>
                  <Box
                    textTransform="uppercase"
                    color="gray.200"
                    letterSpacing="0.19em"
                    fontSize="xs"
                  >
                    [ No code clarity smart contracts builder ]
                  </Box>
                </Flex>
                <Flex
                  bg="gray.900"
                  direction="column"
                  gap="8"
                  p="10"
                  borderRadius="md"
                  align="center"
                  w="md"
                  // fixed height to prevent layout flicker when switching
                  height={308}
                >
                  {creatingContract ? (
                    <>
                      <Box color="gray.300" fontFamily="caption" fontSize="lg">
                        {creatingTemplate === "nft"
                          ? "Name your NFT Smart Contract"
                          : "Name your Token's Ticker"}
                      </Box>
                      <Flex direction="column" gap="4" w="full">
                        <Input
                          placeholder={
                            creatingTemplate === "nft"
                              ? "my-awesome-nft"
                              : "HAI"
                          }
                          value={contractName}
                          onChange={handleContractNameChange}
                        />
                        <Button
                          variant="link"
                          onClick={handleGenerateRandomName}
                        >
                          <Icon as={IoIosShuffle} boxSize="5" mr="1" />
                          Random name generator
                        </Button>
                        <Button
                          mt="7"
                          variant="primary"
                          as={Link}
                          href={`/templates/${creatingTemplate}${
                            contractName ? `?name=${contractName}` : ""
                          }`}
                        >
                          Create project
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Box color="gray.300" fontFamily="caption" fontSize="lg">
                        Choose your starter
                      </Box>
                      <Flex direction="column" w="full">
                        <div
                          onMouseEnter={() => setShowContractPreview(true)}
                          onMouseLeave={() => setShowContractPreview(false)}
                        >
                          <Button
                            size="lg"
                            onClick={() => handleCreateContractClick("nft")}
                            w="full"
                            marginBottom={2}
                          >
                            NFT Smart Contract
                          </Button>
                        </div>
                        <div
                          onMouseEnter={() => setShowContractPreview(true)}
                          onMouseLeave={() => setShowContractPreview(false)}
                        >
                          <Button
                            size="lg"
                            onClick={() => handleCreateContractClick("ft")}
                            w="full"
                            marginBottom={2}
                          >
                            Token Contract
                          </Button>
                        </div>
                        <div
                          onMouseEnter={() => setShowComingSoon(true)}
                          onMouseLeave={() => setShowComingSoon(false)}
                        >
                          <Tooltip label="Coming Soon" placement="right">
                            <Button size="lg" w="full" marginBottom={2}>
                              Decentralized Chat App
                            </Button>
                          </Tooltip>
                        </div>
                      </Flex>
                    </>
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Flex w="full" justify="center">
              <Flex direction="column" gap="4" align="center" mb="2">
                <Flex gap="2">
                  <Box
                    as="a"
                    href="https://hiro.so"
                    target="_blank"
                    w="33px"
                    h="33px"
                  >
                    <img src="/grayLogo.png" alt="Hiro Logo" />
                  </Box>
                  <Flex
                    as="a"
                    href="https://clarity-lang.org/"
                    target="_blank"
                    h="33px"
                    gap="1"
                    align="center"
                    px="3"
                    borderRadius="md"
                    border="2px"
                    borderColor="gray.500"
                  >
                    <Box minWidth="17px">
                      <img src="/clarityLogo.png" alt="Clarity" />
                    </Box>
                    <Text>Clarity</Text>
                    <Text color="gray.300" whiteSpace="nowrap">
                      Smart Contracts
                    </Text>
                  </Flex>
                </Flex>
                <Box color="gray.400" fontFamily="caption">
                  © 2023 Hiro Systems
                </Box>
              </Flex>
            </Flex>
          </Flex>
        }
        right={
          <Flex
            bg="gray.600"
            borderRadius="md"
            w="full"
            h="full"
            justify="center"
            align="center"
          >
            {showComingSoon ? <ComingSoon /> : null}
            {showContractPreview ? (
              <Box width="80%" maxW="700px">
                <img src="/contractPreview.png" />
              </Box>
            ) : null}
            {!showComingSoon && !showContractPreview ? (
              <Box w="60%" maxW="550px">
                <img aria-hidden src="/hiroAscii.png" />
              </Box>
            ) : null}
          </Flex>
        }
      />
    </div>
  );
}
