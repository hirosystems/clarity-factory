import { FC } from "react";
import { NFTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-ui.schema";
import FormField from "../../../../common/components/formField";
import { cloneDeep, get, set } from "lodash";

interface NftFormProps {
  formData: NFTTemplateSettings;
  onChange: Function;
}

const NftForm: FC<NftFormProps> = ({ formData, onChange }) => {
  // Handle text input changes
  const getTextChangeHandler = (field) => {
    return (e) => {
      console.log({ field, e });
      // Can be optimized later
      const newFormData = cloneDeep(formData);
      set(newFormData, field, e.target.value);
      onChange(newFormData);
    };
  };

  return (
    <FormField
      label="Name"
      value={get(formData, "general.name")}
      onChange={getTextChangeHandler("general.name")}
    />
  );
};

export default NftForm;
