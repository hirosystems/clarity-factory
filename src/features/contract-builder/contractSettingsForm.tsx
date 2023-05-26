import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Cases } from "./cases";
import styles from "../../styles/Form.module.css";
import { NFTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-nft.schema";
import { FTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-ft.schema";
import NftForm from "./cases/nft/form";
import FtForm from "./cases/ft/form";

interface FormProps {
  templateCase: Cases;
  formData: NFTTemplateSettings | FTTemplateSettings;
  onChange: Function;
}

const ContractSettingsForm: FC<FormProps> = ({
  templateCase,
  onChange,
  formData,
}) => {
  let form = null;
  if (templateCase === Cases.Nft) {
    form = (
      <NftForm formData={formData as NFTTemplateSettings} onChange={onChange} />
    );
  } else if (templateCase === Cases.Ft) {
    form = (
      <FtForm formData={formData as NFTTemplateSettings} onChange={onChange} />
    );
  }

  return (
    <Box mb="20" w="full" className={styles.formWrapper}>
      {form}
    </Box>
  );
};

export default ContractSettingsForm;
