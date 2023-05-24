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

const Form = withTheme(ChakraUITheme);

const globalUiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    norender: true,
  },
};

interface FormProps {
  templateCase: Cases;
  onChange: Function;
}

const ContractSettingsForm: FC<FormProps> = ({ templateCase, onChange }) => {
  const { schema, initialData, uiSchema } = cases[templateCase];

  const [formData, setFormData] = useState(initialData);

  const handleChange = ({ formData, errors }: IChangeEvent) => {
    console.log({ formData, errors });
    setFormData(formData);
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
