import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import ContractSettingsForm from "../features/contract-builder/contractSettingsForm";
import { Cases } from "../features/contract-builder/cases";
import ContractOutput from "../features/contract-builder/contractOutput";
import { buildSmartContract } from "../../clarity-factory/dist/main";
import { useState } from "react";

export default function Home() {
  const [contractBody, setContractBody] = useState("");

  const onFormChange = (formData) => {
    const contract = buildSmartContract("nft", formData);
    console.log({ contract });
    setContractBody(contract);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Clarity Factory</title>
        <meta
          name="description"
          content="Create smart contracts with no code."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/AeonikFono/AeonikFono-Regular.woff2"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
        />
      </Head>

      <Flex as="main" mx="auto" gap="2" h="100vh" maxW="2000px" pb="16">
        <Flex overflowY="scroll" pt="8" px="4" basis="50%" grow="0" shrink="0">
          <ContractSettingsForm
            templateCase={Cases.Nft}
            onChange={onFormChange}
          />
        </Flex>
        <Flex overflowY="scroll" pt="8" px="4" basis="50%" grow="0" shrink="0">
          <ContractOutput contractBody={contractBody} />
        </Flex>
      </Flex>

      <Flex
        as="footer"
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        bg="gray.900"
      >
        <Flex
          as="a"
          align="center"
          mx="auto"
          h="12"
          href="https://hiro.so"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by
          <Box className={styles.logo} ml="2">
            <Image src="/logo.png" alt="Hiro Logo" width={30} height={30} />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
