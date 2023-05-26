import { FC, useEffect, useState } from "react";
import cases, { Cases } from "./cases";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ContractSettingsForm from "./contractSettingsForm";
import ContractOutput from "./contractOutput";
import { buildSmartContract } from "../../../clarity-factory/dist/main";
import { NFTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-nft.schema";
import { FTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-ft.schema";
import { merge } from "lodash";
import Link from "next/link";
import ComingSoon from "../../common/components/comingSoon";
import TwoColumnLayoutExpendable from "../../common/components/towColumnLayoutExpendable";

interface ContractBuilderProps {
  templateCase: Cases;
  initialDataOverrides: object;
}

const ContractBuilder: FC<ContractBuilderProps> = ({
  templateCase,
  initialDataOverrides,
}) => {
  const [contractBody, setContractBody] = useState("");
  const [contractCopied, setContractCopied] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const { initialData } = cases[templateCase];
  const [formData, setFormData] = useState<
    NFTTemplateSettings | FTTemplateSettings
  >(merge(initialData, initialDataOverrides));

  const onFormChange = (formData) => {
    setFormData(formData);
    // TODO: handle and display errors in console, also errors from form?
    console.log("Change to form data; generating contract");
    console.log({ formData });

    let contract = "";
    try {
      if (templateCase === Cases.Nft) {
        contract = buildSmartContract("nft", formData).contract;
      } else if (templateCase === Cases.Ft) {
        contract = buildSmartContract("ft", formData).contract;
      } else {
        throw new Error("Unsupported template type");
      }
    } catch (err) {
      // contract = contractBody;
      console.log({ err });
    }
    setContractBody(contract);
  };

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(contractBody);
    setContractCopied(true);
    setTimeout(() => {
      setContractCopied(false);
    }, 1500);
  };

  const handleDeploy = () => {
    setShowDeployModal(true);
  };

  const toggleOutput = () => {
    setShowOutput(!showOutput);
  };

  useEffect(() => {
    onFormChange(merge(initialData, initialDataOverrides));
  }, [initialDataOverrides]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TwoColumnLayoutExpendable
        showOutput={showOutput}
        toggleOutput={toggleOutput}
        left={
          <Box p="4" pr="0" w="full">
            <Box
              p="8"
              position="fixed"
              left="0"
              top="0"
              bg="gray.700"
              zIndex="2"
            >
              <Box w="full">
                <Box w="140px">
                  <Link href="/">
                    <img src="/hiroMakerLogoSimple.png" />
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box mt="14" w="full">
              <ContractSettingsForm
                {...{
                  templateCase,
                  formData,
                  onChange: onFormChange,
                  displayLarge: !showOutput,
                  contractCopied,
                  handleCopyToClipboard,
                }}
              />
            </Box>
          </Box>
        }
        right={<ContractOutput contractBody={contractBody} />}
      />

      {/* Deploy modal */}
      <Modal
        isOpen={showDeployModal}
        onClose={() => {
          setShowDeployModal(false);
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt="5" fontWeight="normal">
            Deploy to the STX Blockchain
          </ModalHeader>
          <ModalCloseButton mt="2" mr="2" />
          <ModalBody>
            <Flex justify="center" mt="6" mb="12">
              <ComingSoon width="150px" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContractBuilder;
