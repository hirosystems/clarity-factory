import { FC, useEffect } from "react";
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
  Tooltip,
} from "@chakra-ui/react";
import InputInfoLabel from "../../../../common/components/inputInfoLabel";
import CheckboxSquare from "../../../../common/components/checkboxSquare";

const FIELDS = {
  NAME: "general.name",
  TOKEN_URI_BASE: "general.token-uri-base.value",
  TOKEN_URI_BASE_UPDATABLE: "general.token-uri-base.updatable",
  ENABLE_CONTRACT_OWNER: "general.enable-contract-owner",
  ENABLE_FREEZE_METADATA: "general.enable-freeze-metadata",
  CONTRACT_OWNER_PARENT: "general.contract-owner",
  CONTRACT_OWNER: "general.contract-owner.value",
  CONTRACT_OWNER_UPDATABLE: "general.contract-owner.updatable",
  ACCEPT_STX: "currency.enable-stx-mint",
  ACCEPT_NYC: "currency.enable-nyc-mint",
  ACCEPT_MIA: "currency.enable-mia-mint",
  STX_PRICE: "currency.stx-price.value",
  STX_PRICE_UPDATABLE: "currency.stx-price.updatable",
  NYC_PRICE: "currency.nyc-price.value",
  NYC_PRICE_UPDATABLE: "currency.nyc-price.updatable",
  MIA_PRICE: "currency.mia-price.value",
  MIA_PRICE_UPDATABLE: "currency.mia-price.updatable",
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
      const newFormData = cloneDeep(formData);
      set(newFormData, field, e.target.checked);
      onChange(newFormData);
    };
  };

  // Special form side effects

  // Clear dependent data when contract owner is disabled
  const enableContractOwner = get(formData, FIELDS.ENABLE_CONTRACT_OWNER);
  useEffect(() => {
    if (!enableContractOwner) {
      const newFormData = cloneDeep(formData);
      unset(newFormData, FIELDS.CONTRACT_OWNER_PARENT);
      set(newFormData, FIELDS.ENABLE_FREEZE_METADATA, false);
      onChange(newFormData);
    }
  }, [enableContractOwner]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex direction="column" gap="4">
      <Heading size="4">Build Your NFT</Heading>
      {/* General Settings */}
      <FormSection label="General Settings" startExpanded>
        <Flex direction="column" gap="7">
          <FormField
            label="Name"
            value={get(formData, FIELDS.NAME)}
            onChange={getTextChangeHandler(FIELDS.NAME)}
          />

          <Flex direction="column" gap="2">
            <FormField
              label="Token Base URI"
              value={get(formData, FIELDS.TOKEN_URI_BASE)}
              onChange={getTextChangeHandler(FIELDS.TOKEN_URI_BASE)}
            />
            <InputInfoLabel>Base URI for the NFT image.</InputInfoLabel>
          </Flex>

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

          <Flex direction="column" gap="2">
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
              The contract owner feature enables administration features, such
              as changing some of the contract&apos;s parameters after it is
              deployed.
            </InputInfoLabel>
          </Flex>

          {/* Show contract owner fields conditionally */}
          {get(formData, FIELDS.ENABLE_CONTRACT_OWNER) ? (
            <>
              <FormField
                label="Contract Owner STX Address"
                value={get(formData, FIELDS.CONTRACT_OWNER)}
                onChange={getTextChangeHandler(FIELDS.CONTRACT_OWNER)}
                isRequired
              />
              <FormControl display="flex" alignItems="center" gap="3">
                <Switch
                  id="contract-owner-updatable"
                  isChecked={get(formData, FIELDS.CONTRACT_OWNER_UPDATABLE)}
                  isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
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

          <Flex direction="column" gap="2">
            <FormControl display="flex" alignItems="center" gap="3">
              <Tooltip
                placement="bottom"
                label={
                  !get(formData, FIELDS.ENABLE_CONTRACT_OWNER)
                    ? "Contract Owner must be enabled"
                    : null
                }
              >
                <span>
                  <Switch
                    id="freeze-metadata"
                    isChecked={get(formData, FIELDS.ENABLE_FREEZE_METADATA)}
                    isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                    onChange={getSwitchChangeHandler(
                      FIELDS.ENABLE_FREEZE_METADATA
                    )}
                  />
                </span>
              </Tooltip>
              <FormLabel htmlFor="freeze-metadata" mb="0">
                Include a function to freeze metadata
              </FormLabel>
            </FormControl>
            <InputInfoLabel>
              The contract owner will be able to call this function to prevent
              any future changes to the token URI.
            </InputInfoLabel>
          </Flex>
        </Flex>
      </FormSection>

      {/* Currency Settings */}
      <FormSection label="Currency Settings">
        <Flex direction="column" gap="7">
          <Flex gap="2">
            <CheckboxSquare
              label="Accept STX"
              isChecked={get(formData, FIELDS.ACCEPT_STX)}
              onChange={getSwitchChangeHandler(FIELDS.ACCEPT_STX)}
            />
            <CheckboxSquare
              label="Accept MIA"
              isChecked={get(formData, FIELDS.ACCEPT_MIA)}
              onChange={getSwitchChangeHandler(FIELDS.ACCEPT_MIA)}
            />
            <CheckboxSquare
              label="Accept NYC"
              isChecked={get(formData, FIELDS.ACCEPT_NYC)}
              onChange={getSwitchChangeHandler(FIELDS.ACCEPT_NYC)}
            />
          </Flex>

          {/* STX settings */}
          {get(formData, FIELDS.ACCEPT_STX) ? (
            <Flex direction="column" gap="3">
              <Heading size="6">STX Settings</Heading>
              <FormField
                label="STX Price"
                value={get(formData, FIELDS.STX_PRICE)}
                onChange={getTextChangeHandler(FIELDS.STX_PRICE)}
                isRequired
              />
              <FormControl display="flex" alignItems="center" gap="3">
                <Tooltip
                  placement="bottom"
                  label={
                    !get(formData, FIELDS.ENABLE_CONTRACT_OWNER)
                      ? "Contract Owner must be enabled"
                      : null
                  }
                >
                  <span>
                    <Switch
                      id="stx-price-updatable"
                      isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                      isChecked={get(formData, FIELDS.STX_PRICE_UPDATABLE)}
                      onChange={getSwitchChangeHandler(
                        FIELDS.STX_PRICE_UPDATABLE
                      )}
                    />
                  </span>
                </Tooltip>
                <FormLabel htmlFor="freeze-metadata" mb="0">
                  Value can be updated after deploy
                </FormLabel>
              </FormControl>
            </Flex>
          ) : null}

          {/* MIA settings */}
          {get(formData, FIELDS.ACCEPT_MIA) ? (
            <Flex direction="column" gap="3">
              <Heading size="6">MIA Settings</Heading>
              <FormField
                label="MIA Price"
                value={get(formData, FIELDS.MIA_PRICE)}
                onChange={getTextChangeHandler(FIELDS.MIA_PRICE)}
                isRequired
              />
              <FormControl display="flex" alignItems="center" gap="3">
                <Tooltip
                  placement="bottom"
                  label={
                    !get(formData, FIELDS.ENABLE_CONTRACT_OWNER)
                      ? "Contract Owner must be enabled"
                      : null
                  }
                >
                  <span>
                    <Switch
                      id="mia-price-updatable"
                      isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                      isChecked={get(formData, FIELDS.MIA_PRICE_UPDATABLE)}
                      onChange={getSwitchChangeHandler(
                        FIELDS.MIA_PRICE_UPDATABLE
                      )}
                    />
                  </span>
                </Tooltip>
                <FormLabel htmlFor="freeze-metadata" mb="0">
                  Value can be updated after deploy
                </FormLabel>
              </FormControl>
            </Flex>
          ) : null}

          {/* NYC settings */}
          {get(formData, FIELDS.ACCEPT_NYC) ? (
            <Flex direction="column" gap="3">
              <Heading size="6">NYC Settings</Heading>
              <FormField
                label="NYC Price"
                value={get(formData, FIELDS.NYC_PRICE)}
                onChange={getTextChangeHandler(FIELDS.NYC_PRICE)}
                isRequired
              />
              <FormControl display="flex" alignItems="center" gap="3">
                <Tooltip
                  placement="bottom"
                  label={
                    !get(formData, FIELDS.ENABLE_CONTRACT_OWNER)
                      ? "Contract Owner must be enabled"
                      : null
                  }
                >
                  <span>
                    <Switch
                      id="mia-price-updatable"
                      isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                      isChecked={get(formData, FIELDS.NYC_PRICE_UPDATABLE)}
                      onChange={getSwitchChangeHandler(
                        FIELDS.NYC_PRICE_UPDATABLE
                      )}
                    />
                  </span>
                </Tooltip>
                <FormLabel htmlFor="freeze-metadata" mb="0">
                  Value can be updated after deploy
                </FormLabel>
              </FormControl>
            </Flex>
          ) : null}
        </Flex>
      </FormSection>
    </Flex>
  );
};

export default NftForm;
