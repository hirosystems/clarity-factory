import { FC } from "react";
import { NFTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-nft.schema";
import FormField from "../../../../common/components/formField";
import { get } from "lodash";
import FormSection from "../../../../common/components/formSection";
import { Flex, Heading } from "@chakra-ui/react";
import InputInfoLabel from "../../../../common/components/inputInfoLabel";
import SwitchField from "../../../../common/components/switchField";
import useFormHandlers from "../../../../common/hooks/useFormHandlers";

const FIELDS = {
  NAME: "general.name",
  FULL_NAME: "general.fullname",
  TOKEN_URI_BASE: "general.token-uri-base",
  MAX_SUPPLY: "general.max-supply",
  MINT_LIMIT: "mint.mint-limit",
  ENABLE_BURN: "mint.enable-burn",
};

interface FtFormProps {
  formData: NFTTemplateSettings;
  displayLarge: boolean;
  onChange: Function;
}

const FtForm: FC<FtFormProps> = ({ formData, displayLarge, onChange }) => {
  const { getSwitchChangeHandler, getTextChangeHandler } = useFormHandlers(
    formData,
    onChange
  );

  return (
    <Flex direction="column" gap="4">
      <Heading size="4">Build Your Token</Heading>

      <Flex
        direction={{ base: "column", lg: displayLarge ? "row" : "column" }}
        gap={4}
      >
        {/* General Settings */}
        <Flex width="full" direction="column" gap={4}>
          <FormSection label="General Settings" startExpanded>
            <Flex direction="column" gap="7">
              <FormField
                label="Token Ticker Name"
                value={get(formData, FIELDS.NAME)}
                onChange={getTextChangeHandler(FIELDS.NAME)}
                isRequired
              />
              <Flex direction="column" gap="2">
                <FormField
                  label="Full Name"
                  value={get(formData, FIELDS.FULL_NAME)}
                  onChange={getTextChangeHandler(FIELDS.FULL_NAME)}
                />
                <InputInfoLabel>
                  A human-readable name for your token.
                </InputInfoLabel>
              </Flex>

              <Flex direction="column" gap="2">
                <FormField
                  label="Max Supply"
                  value={get(formData, FIELDS.MAX_SUPPLY)}
                  onChange={getTextChangeHandler(FIELDS.MAX_SUPPLY)}
                />
                <InputInfoLabel>Maximum supply of the token.</InputInfoLabel>
              </Flex>

              <Flex direction="column" gap="2">
                <FormField
                  label="Token Base URI"
                  value={get(formData, FIELDS.TOKEN_URI_BASE)}
                  onChange={getTextChangeHandler(FIELDS.TOKEN_URI_BASE)}
                  isRequired
                />
                <InputInfoLabel>
                  Base URI for the FT metadata (see SIP-016). Typically starts
                  with &apos;https&apos;, &apos;ar&apos;, &apos;ipfs&apos;, or
                  &apos;sia&apos;.
                </InputInfoLabel>
              </Flex>
            </Flex>
          </FormSection>
        </Flex>
        {/* Mint Settings */}
        <Flex width="full" direction="column" gap={4}>
          <FormSection label="Mint Settings" startExpanded>
            <Flex direction="column" gap="7">
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
              <Flex direction="column" gap="2">
                <SwitchField
                  id="enable-burn"
                  isChecked={get(formData, FIELDS.ENABLE_BURN)}
                  onChange={getSwitchChangeHandler(FIELDS.ENABLE_BURN)}
                  label="Enable burn"
                />
                <InputInfoLabel>
                  Token holders will be able to call the ft-burn function to
                  burn tokens.
                </InputInfoLabel>
              </Flex>
            </Flex>
          </FormSection>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FtForm;
