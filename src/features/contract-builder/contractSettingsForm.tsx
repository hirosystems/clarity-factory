import { FC } from "react";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import StacksIcon from "../../common/components/StacksIcon";
import { Cases } from "./cases";
import styles from "../../styles/Form.module.css";
import { NFTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-nft.schema";
import { FTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-ft.schema";
import NftForm from "./cases/nft/form";
import FtForm from "./cases/ft/form";

interface FormProps {
  templateCase: Cases;
  formData: NFTTemplateSettings | FTTemplateSettings;
  displayLarge: boolean;
  contractCopied: boolean;
  onChange: Function;
  handleCopyToClipboard: () => void;
  handleDeploy: () => void;
}

const ContractSettingsForm: FC<FormProps> = ({
  templateCase,
  onChange,
  formData,
  displayLarge,
  contractCopied,
  handleCopyToClipboard,
  handleDeploy,
}) => {
  let form = null;
  if (templateCase === Cases.Nft) {
    form = (
      <NftForm
        formData={formData as NFTTemplateSettings}
        {...{ onChange, displayLarge }}
      />
    );
  } else if (templateCase === Cases.Ft) {
    form = (
      <FtForm
        formData={formData as NFTTemplateSettings}
        {...{ onChange, displayLarge }}
      />
    );
  }

  return (
    <Box mb="20" w="full" className={styles.formWrapper}>
      {form}

      {/* Copy/deploy buttons */}
      <Flex
        justifyContent="left"
        position="fixed"
        left="0"
        bottom="0"
        right="55%"
        bg="gray.700"
        zIndex="1"
      >
        <Flex py="20px" pl="30px" gap="2">
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
            {contractCopied ? "Copied!" : "Copy Contract"}
          </Button>
          <Button
            variant="primary"
            size="md"
            bg="mint"
            onClick={handleDeploy}
            leftIcon={<StacksIcon />}
          >
            Deploy
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ContractSettingsForm;
