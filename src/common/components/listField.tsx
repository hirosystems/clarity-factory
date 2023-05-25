import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FC } from "react";
import FormField from "./formField";
import { cloneDeep } from "lodash";
import { TiDelete } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";

interface ListFieldInterface {
  label: string;
  value: string[];
  onChange: Function;
}

const ListField: FC<ListFieldInterface> = ({ label, value, onChange }) => {
  const handleItemChange = (i, e) => {
    console.log({ i, val: e.target.value });
    const newVal = cloneDeep(value);
    newVal[i] = e.target.value;
    onChange(newVal);
  };

  const handleRemoveItem = (i) => {
    const newVal = cloneDeep(value);
    newVal.splice(i, 1);
    onChange(newVal);
  };

  const handleAddItem = () => {
    onChange([...(value || []), ""]);
  };

  return (
    <Flex direction="column" gap="3">
      {(value || []).map((item, i) => (
        <Flex key={`item-${i}`} align="start" gap="2">
          <FormField
            label={`${label} #${i + 1}`}
            value={item}
            onChange={(e) => {
              handleItemChange(i, e);
            }}
            isRequired
          />
          <Flex
            align="center"
            as="button"
            onClick={() => {
              handleRemoveItem(i);
            }}
            height="48px"
          >
            <Icon as={TiDelete} boxSize="6" color="gray.400" />
          </Flex>
        </Flex>
      ))}
      <span>
        <Button
          onClick={handleAddItem}
          leftIcon={<Icon as={AiOutlinePlus} />}
          display="inline-flex"
          alignItems="center"
        >
          Add address
        </Button>
      </span>
    </Flex>
  );
};

export default ListField;
