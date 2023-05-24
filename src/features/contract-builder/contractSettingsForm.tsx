import { FC, useState } from "react";
import {
  RJSFSchema,
  RJSFValidationError,
  RegistryFieldsType,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Box, Heading } from "@chakra-ui/react";
import { IChangeEvent, withTheme } from "@rjsf/core";
import { Theme as ChakraUITheme } from "@rjsf/chakra-ui";
import { UiSchema } from "@rjsf/utils";
import cases, { Cases } from "./cases";
import styles from "../../styles/Form.module.css";
import { NFTTemplateSettings } from "../../../clarity-factory/src/types/contract-settings-ui.schema";

const Form = withTheme(ChakraUITheme);

const globalUiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    norender: true,
  },
};

interface FormProps {
  templateCase: Cases;
  formData: NFTTemplateSettings; // For now, later more options
  onChange: Function;
}

const ContractSettingsForm: FC<FormProps> = ({
  templateCase,
  onChange,
  formData,
}) => {
  const { schema, uiSchema } = cases[templateCase];

  const handleChange = ({ formData, errors }: IChangeEvent) => {
    console.log({ formData, errors });
    onChange(formData);
  };

  const handleError = (errors: RJSFValidationError[]) => {
    console.log({ errors });
  };

  return (
    <Box mb="20" w="full" className={styles.formWrapper}>
      <Form
        schema={schema}
        uiSchema={{
          ...globalUiSchema,
          ...uiSchema,
        }}
        formData={formData}
        validator={validator}
        onChange={handleChange}
        onError={handleError}
      />
    </Box>
  );
};

export default ContractSettingsForm;
