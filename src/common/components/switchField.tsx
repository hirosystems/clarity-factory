import {
  FormControl,
  FormLabel,
  Switch,
  SwitchProps,
  Tooltip,
} from "@chakra-ui/react";
import { FC } from "react";

interface SwitchFieldProps extends SwitchProps {
  id: string;
  label: string;
  isDisabled?: boolean;
  disabledMessage?: string;
}

const SwitchField: FC<SwitchFieldProps> = ({
  id,
  label,
  isDisabled,
  disabledMessage,
  ...switchProps
}) => {
  return (
    <FormControl display="flex" alignItems="center" gap="3">
      <Tooltip placement="bottom" label={isDisabled ? disabledMessage : null}>
        <span>
          <Switch id={id} isDisabled={isDisabled} {...switchProps} />
        </span>
      </Tooltip>
      <FormLabel htmlFor={id} mb="0">
        {label}
      </FormLabel>
    </FormControl>
  );
};

export default SwitchField;
