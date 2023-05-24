import { FC, useEffect, useState } from "react";
import cases, { Cases } from "./cases";
import { Box, Flex } from "@chakra-ui/react";
import ContractSettingsForm from "./contractSettingsForm";
import ContractOutput from "./contractOutput";
import { buildSmartContract } from "../../../clarity-factory/dist/main";
import TwoColumnLayout from "../../common/components/twoColumnLayout";
import { NFTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-ui.schema";
import { merge } from "lodash";
import Link from "next/link";

interface ContractBuilderProps {
  templateCase: Cases;
  initialDataOverrides: object;
}

const ContractBuilder: FC<ContractBuilderProps> = ({
  templateCase,
  initialDataOverrides,
}) => {
  const [contractBody, setContractBody] = useState("");
  const { initialData } = cases[templateCase];
  const [formData, setFormData] = useState<NFTTemplateSettings>(
    merge(initialData, initialDataOverrides)
  );

  useEffect(() => {
    setFormData(merge(initialData, initialDataOverrides));
  }, [initialDataOverrides]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFormChange = (formData) => {
    setFormData(formData);
    // TODO: handle and display errors in console, also errors from form?
    let contract = "";
    try {
      contract = buildSmartContract("nft", formData);
    } catch (err) {
      console.log({ err });
    }
    console.log({ contract });
    setContractBody(contract);
  };

  return (
    <TwoColumnLayout
      left={
        <Box p="4">
          <Box w="200px" pb="4">
            <Link href="/">
              <img src="/hiroMakerLogoSimple.png" />
            </Link>
          </Box>
          <ContractSettingsForm
            templateCase={templateCase}
            formData={formData}
            onChange={onFormChange}
          />
        </Box>
      }
      right={<ContractOutput contractBody={contractBody} />}
    />
  );
};

export default ContractBuilder;
