// All-in-one form field with label within the input box.
// Must be used as a controlled input.

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC, ReactNode, useState } from "react";

interface FormFieldProps extends InputProps {
  value: any;
  onChange: ChangeEventHandler<HTMLElement>;
  label: string;
  rightElement?: ReactNode;
}

const FormField: FC<FormFieldProps> = ({
  value,
  onChange,
  label,
  rightElement,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { onFocus, onBlur } = inputProps;

  const handleFocus = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const displayLabelAsPlaceholder =
    !isFocused && (!value || value.length === 0);

  return (
    <FormControl w="full">
      <FormLabel
        position="absolute"
        zIndex="1"
        marginTop="14px"
        marginLeft="16px"
        transform={
          displayLabelAsPlaceholder
            ? "scale(1)"
            : "scale(0.8) translate(-10px, -14px)"
        }
        transition="transform 250ms"
      >
        {label}
      </FormLabel>
      <InputGroup w="full">
        <Input
          {...inputProps} // eslint-disable-line react/jsx-props-no-spreading
          value={value}
          onChange={onChange}
          h="48px"
          pt="13px"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightElement && (
          <InputRightElement w="auto" h="auto" top="8px" right="8px">
            {rightElement}
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default FormField;
