import { FC, useEffect, useState } from "react";
import { NFTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-nft.schema";
import FormField from "../../../../common/components/formField";
import { cloneDeep, get, set, unset } from "lodash";
import FormSection from "../../../../common/components/formSection";
import { Flex, Heading, Icon, Tooltip } from "@chakra-ui/react";
import InputInfoLabel from "../../../../common/components/inputInfoLabel";
import CheckboxSquare from "../../../../common/components/checkboxSquare";
import SwitchField from "../../../../common/components/switchField";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import ListField from "../../../../common/components/listField";
import useFormHandlers from "../../../../common/hooks/useFormHandlers";

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
  MINT_LIMIT: "mint.mint-limit.value",
  MINT_LIMIT_PARENT: "mint.mint-limit",
  MINT_LIMIT_UPDATABLE: "mint.mint-limit.updatable",
  ALLOW_LIST_ADDRESSES: "mint.allow-list.addresses",
  ALLOW_LIST_PARENT: "mint.allow-list",
  ALLOW_ALL_AT_BLOCK_HEIGHT: "mint.allow-list.allow-all-at-block-height.value",
  ALLOW_ALL_AT_BLOCK_HEIGHT_UPDATABLE:
    "mint.allow-list.allow-all-at-block-height.updatable",
  ALLOW_ALL_AT_BLOCK_HEIGHT_PARENT: "mint.allow-list.allow-all-at-block-height",
};

interface NftFormProps {
  formData: NFTTemplateSettings;
  displayLarge: boolean;
  onChange: Function;
}

const NftForm: FC<NftFormProps> = ({ formData, onChange, displayLarge }) => {
  const [showEarlyBirdSection, setShowEarlyBirdSection] = useState(false);
  const [showAllowAtBlockHeightSection, setShowAllowAtBlockHeightSection] =
    useState(false);

  const { getChangeHandler, getSwitchChangeHandler, getTextChangeHandler } =
    useFormHandlers(formData, onChange);

  /* Special form side effects */

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

  // Clear object when mint limit is removed
  const mintLimit = get(formData, FIELDS.MINT_LIMIT);
  useEffect(() => {
    if (!mintLimit) {
      const newFormData = cloneDeep(formData);
      unset(newFormData, FIELDS.MINT_LIMIT_PARENT);
      onChange(newFormData);
    }
  }, [mintLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add blank starter address when early bird section is enabled
  // Clear allow list data when section is disabled
  useEffect(() => {
    const newFormData = cloneDeep(formData);
    if (showEarlyBirdSection) {
      set(newFormData, FIELDS.ALLOW_LIST_ADDRESSES, [""]);
    } else {
      unset(newFormData, FIELDS.ALLOW_LIST_PARENT);
    }
    onChange(newFormData);
  }, [showEarlyBirdSection]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear allow at block height data when section is disabled
  useEffect(() => {
    if (!showAllowAtBlockHeightSection) {
      const newFormData = cloneDeep(formData);
      unset(newFormData, FIELDS.ALLOW_ALL_AT_BLOCK_HEIGHT_PARENT);
      onChange(newFormData);
    }
  }, [showAllowAtBlockHeightSection]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex direction="column" gap="4">
      <Heading size="4">Build Your NFT</Heading>

      <Flex direction={displayLarge ? "row" : "column"} gap={4}>
        {/* General Settings */}
        <Flex width="full" direction="column" gap={4}>
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

              <SwitchField
                id="uri-updatable"
                isChecked={get(formData, FIELDS.TOKEN_URI_BASE_UPDATABLE)}
                onChange={getSwitchChangeHandler(
                  FIELDS.TOKEN_URI_BASE_UPDATABLE
                )}
                label="Base URI can be updated after deploy"
              />

              <Flex direction="column" gap="2">
                <SwitchField
                  id="contract-owner"
                  isChecked={get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                  onChange={getSwitchChangeHandler(
                    FIELDS.ENABLE_CONTRACT_OWNER
                  )}
                  label="Enable Contract Owner"
                />
                <InputInfoLabel>
                  The contract owner feature enables administration features,
                  such as changing some of the contract&apos;s parameters after
                  it is deployed.
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
                  <SwitchField
                    id="contract-owner-updatable"
                    isChecked={get(formData, FIELDS.CONTRACT_OWNER_UPDATABLE)}
                    isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                    onChange={getSwitchChangeHandler(
                      FIELDS.CONTRACT_OWNER_UPDATABLE
                    )}
                    label="Owner can be updated after deploy"
                  />
                </>
              ) : null}

              <Flex direction="column" gap="2">
                <SwitchField
                  id="freeze-metadata"
                  isChecked={get(formData, FIELDS.ENABLE_FREEZE_METADATA)}
                  isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                  disabledMessage="Contract Owner must be enabled"
                  onChange={getSwitchChangeHandler(
                    FIELDS.ENABLE_FREEZE_METADATA
                  )}
                  label="Include a function to freeze metadata"
                />
                <InputInfoLabel>
                  The contract owner will be able to call this function to
                  prevent any future changes to the token URI.
                </InputInfoLabel>
              </Flex>
            </Flex>
          </FormSection>
        </Flex>

        <Flex width="full" direction="column" gap={4}>
          {/* Currency Settings */}
          <FormSection
            label="Currency Settings"
            startExpanded={displayLarge ? true : false}
          >
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
                  <SwitchField
                    id="stx-price-updatable"
                    isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                    disabledMessage="Contract Owner must be enabled"
                    isChecked={get(formData, FIELDS.STX_PRICE_UPDATABLE)}
                    onChange={getSwitchChangeHandler(
                      FIELDS.STX_PRICE_UPDATABLE
                    )}
                    label="Value can be updated after deploy"
                  />
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
                  <SwitchField
                    id="mia-price-updatable"
                    isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                    isChecked={get(formData, FIELDS.MIA_PRICE_UPDATABLE)}
                    onChange={getSwitchChangeHandler(
                      FIELDS.MIA_PRICE_UPDATABLE
                    )}
                    disabledMessage="Contract Owner must be enabled"
                    label="Value can be updated after deploy"
                  />
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
                  <SwitchField
                    id="nyc-price-updatable"
                    isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                    isChecked={get(formData, FIELDS.NYC_PRICE_UPDATABLE)}
                    onChange={getSwitchChangeHandler(
                      FIELDS.NYC_PRICE_UPDATABLE
                    )}
                    disabledMessage="Contract Owner must be enabled"
                    label="Value can be updated after deploy"
                  />
                </Flex>
              ) : null}
            </Flex>
          </FormSection>

          {/* Mint Settings */}
          <FormSection label="Mint Settings">
            <Flex direction="column" gap="8">
              {/* Mint Limit */}
              <Flex direction="column" gap="3">
                <Flex direction="column" gap="2">
                  <FormField
                    label="Mint Limit"
                    value={get(formData, FIELDS.MINT_LIMIT)}
                    onChange={getTextChangeHandler(FIELDS.MINT_LIMIT)}
                  />
                  <InputInfoLabel>
                    Mint limit per STX address. Leave empty for unlimited.
                  </InputInfoLabel>
                </Flex>
                <SwitchField
                  id="mint-limit-updatable"
                  isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                  isChecked={get(formData, FIELDS.MINT_LIMIT_UPDATABLE)}
                  onChange={getSwitchChangeHandler(FIELDS.MINT_LIMIT_UPDATABLE)}
                  disabledMessage="Contract Owner must be enabled"
                  label="Mint limit can be updated after deploy"
                />
              </Flex>

              {/* Early bird list */}
              <Flex direction="column" gap="4">
                <Flex gap="2" align="center">
                  <CheckboxSquare
                    label="Enable Early Bird Access"
                    isChecked={showEarlyBirdSection}
                    onChange={(e) => {
                      setShowEarlyBirdSection(e.target.checked);
                    }}
                  />
                  <Tooltip
                    placement="right"
                    label="Allow addresses to claim early access to your NFT."
                  >
                    <Flex align="center">
                      <Icon as={AiOutlineQuestionCircle} boxSize="4" />
                    </Flex>
                  </Tooltip>
                </Flex>
                {showEarlyBirdSection ? (
                  <ListField
                    label="Allowed STX Address"
                    value={get(formData, FIELDS.ALLOW_LIST_ADDRESSES)}
                    onChange={getChangeHandler(FIELDS.ALLOW_LIST_ADDRESSES)}
                  />
                ) : null}
              </Flex>

              {/* Allow at block height */}
              <Flex direction="column" gap="4">
                <Flex gap="2" align="center">
                  <CheckboxSquare
                    label="Allow all at block height"
                    isChecked={showAllowAtBlockHeightSection}
                    onChange={(e) => {
                      setShowAllowAtBlockHeightSection(e.target.checked);
                    }}
                  />
                  <Tooltip
                    placement="right"
                    label="Allow everyone to mint from this block height. Leave empty to disable mint for all."
                  >
                    <Flex align="center">
                      <Icon as={AiOutlineQuestionCircle} boxSize="4" />
                    </Flex>
                  </Tooltip>
                </Flex>
                {showAllowAtBlockHeightSection ? (
                  <Flex direction="column" gap="4">
                    <FormField
                      label="Block height"
                      isRequired
                      value={get(formData, FIELDS.ALLOW_ALL_AT_BLOCK_HEIGHT)}
                      onChange={getTextChangeHandler(
                        FIELDS.ALLOW_ALL_AT_BLOCK_HEIGHT
                      )}
                    />
                    <SwitchField
                      id="block-height-updatable"
                      isDisabled={!get(formData, FIELDS.ENABLE_CONTRACT_OWNER)}
                      isChecked={get(
                        formData,
                        FIELDS.ALLOW_ALL_AT_BLOCK_HEIGHT_UPDATABLE
                      )}
                      onChange={getSwitchChangeHandler(
                        FIELDS.ALLOW_ALL_AT_BLOCK_HEIGHT_UPDATABLE
                      )}
                      disabledMessage="Contract Owner must be enabled"
                      label="Block height can be updated after deploy"
                    />
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
          </FormSection>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NftForm;
