import { FC } from "react";
import { NFTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-ui.schema";
import FormField from "../../../../common/components/formField";
import { cloneDeep, get, set, unset } from "lodash";
import FormSection from "../../../../common/components/formSection";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
} from "@chakra-ui/react";
import InputInfoLabel from "../../../../common/components/inputInfoLabel";
import CheckboxSquare from "../../../../common/components/checkboxSquare";

const FIELDS = {
  NAME: "general.name",
  TOKEN_URI_BASE: "general.token-uri-base.value",
  TOKEN_URI_BASE_UPDATABLE: "general.token-uri-base.updatable",
  ENABLE_CONTRACT_OWNER: "general.enable-contract-owner",
  ENABLE_FREEZE_METADATA: "general.enable-freeze-metadata",
  CONTRACT_OWNER: "general.contract-owner.value",
  CONTRACT_OWNER_UPDATABLE: "general.contract-owner.updatable",
  ACCEPT_STX: "",
};

interface NftFormProps {
  formData: NFTTemplateSettings;
  onChange: Function;
}

const NftForm: FC<NftFormProps> = ({ formData, onChange }) => {
  // Handle text input changes
  const getTextChangeHandler = (field) => {
    return (e) => {
      // Can be optimized later
      const newFormData = cloneDeep(formData);
      const newValue = e.target.value;
      if (!newValue) {
        // Clear if empty
        unset(newFormData, field);
      } else {
        set(newFormData, field, newValue);
      }
      onChange(newFormData);
    };
  };

  const getSwitchChangeHandler = (field) => {
    return (e) => {
      console.log(e.target.checked);
      const newFormData = cloneDeep(formData);
      set(newFormData, field, e.target.checked);
      onChange(newFormData);
    };
  };

  return (
    <Flex direction="column" gap="4">
      <Heading size="4">Build Your NFT</Heading>
      {/* General Settings */}
      <FormSection label="General Settings" startExpanded>
        <Flex direction="column" gap="5">
          <FormField
            label="Name"
            value={get(formData, FIELDS.NAME)}
            onChange={getTextChangeHandler(FIELDS.NAME)}
          />
          <FormField
            label="Token Base URI"
            value={get(formData, FIELDS.TOKEN_URI_BASE)}
            onChange={getTextChangeHandler(FIELDS.TOKEN_URI_BASE)}
          />
          <InputInfoLabel>Base URI for the NFT image.</InputInfoLabel>
          <FormControl display="flex" alignItems="center" gap="3">
            <Switch
              id="uri-updatable"
              isChecked={get(formData, FIELDS.TOKEN_URI_BASE_UPDATABLE)}
              onChange={getSwitchChangeHandler(FIELDS.TOKEN_URI_BASE_UPDATABLE)}
            />
            <FormLabel htmlFor="uri-updatable" mb="0">
              Base URI can be updated after deploy
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center" gap="3">
            <Switch
              id="contract-owner"
              isChecked={get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
              onChange={getSwitchChangeHandler(FIELDS.ENABLE_CONTRACT_OWNER)}
            />
            <FormLabel htmlFor="contract-owner" mb="0">
              Enable Contract Owner
            </FormLabel>
          </FormControl>
          <InputInfoLabel>
            The contract owner feature enables administration features, such as
            changing some of the contract&apos;s parameters after it is
            deployed.
          </InputInfoLabel>
          {/* Show contract owner fields conditionally */}
          {get(formData, FIELDS.ENABLE_CONTRACT_OWNER) ? (
            <>
              <FormField
                label="Contract Owner STX Address"
                value={get(formData, FIELDS.CONTRACT_OWNER)}
                onChange={getTextChangeHandler(FIELDS.CONTRACT_OWNER)}
              />
              <FormControl display="flex" alignItems="center" gap="3">
                <Switch
                  id="contract-owner-updatable"
                  isChecked={get(formData, FIELDS.CONTRACT_OWNER_UPDATABLE)}
                  isDisabled={!get(formData, FIELDS.CONTRACT_OWNER)}
                  onChange={getSwitchChangeHandler(
                    FIELDS.CONTRACT_OWNER_UPDATABLE
                  )}
                />
                <FormLabel htmlFor="contract-owner-updatable" mb="0">
                  Owner can be updated after deploy
                </FormLabel>
              </FormControl>
            </>
          ) : null}
          <FormControl display="flex" alignItems="center" gap="3">
            <Switch
              id="freeze-metadata"
              isChecked={get(formData, FIELDS.ENABLE_FREEZE_METADATA)}
              onChange={getSwitchChangeHandler(FIELDS.ENABLE_FREEZE_METADATA)}
            />
            <FormLabel htmlFor="freeze-metadata" mb="0">
              Include a function to freeze metadata
            </FormLabel>
          </FormControl>
          <InputInfoLabel>
            The contract owner will be able to call this function to prevent any
            future changes to the token URI.
          </InputInfoLabel>
        </Flex>
      </FormSection>
      {/* Currency Settings */}
      <FormSection label="Currency Settings">
        <Flex direction="column" gap="5">
          <Box>
            <CheckboxSquare label="Accept STX" />
            <CheckboxSquare label="Accept MIA" />
            <CheckboxSquare label="Accept NYC" />
          </Box>
        </Flex>
      </FormSection>
    </Flex>
  );
};

export default NftForm;
