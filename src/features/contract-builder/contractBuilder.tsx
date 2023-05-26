import { FC, useEffect, useState } from "react";
import cases, { Cases } from "./cases";
import {
  Box,
  Button,
  Flex,
  Icon,
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
import TwoColumnLayout from "../../common/components/twoColumnLayout";
import { NFTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-nft.schema";
import { FTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-ft.schema";
import { merge } from "lodash";
import Link from "next/link";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import StacksIcon from "../../common/components/StacksIcon";
import ComingSoon from "../../common/components/comingSoon";

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

  useEffect(() => {
    onFormChange(merge(initialData, initialDataOverrides));
  }, [initialDataOverrides]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TwoColumnLayout
        left={
          <Box p="4" pr="0" w="full">
            <Box
              p="8"
              position="fixed"
              left="0"
              top="0"
              right="50%"
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
                templateCase={templateCase}
                formData={formData}
                onChange={onFormChange}
              />
            </Box>
          </Box>
        }
        right={<ContractOutput contractBody={contractBody} />}
      />

      {/* Copy/deploy buttons */}
      <Flex position="fixed" right="38px" bottom="38px" gap="2">
        <Button
          onClick={handleCopyToClipboard}
          bg="gray.900"
          display="inline-flex"
          alignItems="center"
          leftIcon={
            contractCopied ? (
              <Icon as={RiCheckLine} boxSize="4" />
            ) : (
              <Icon as={RiFileCopyLine} boxSize="4" />
            )
          }
        >
          {contractCopied ? "Copied!" : "Copy"}
        </Button>
        <Button onClick={handleDeploy} leftIcon={<StacksIcon />} bg="gray.900">
          Deploy
        </Button>
      </Flex>

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
