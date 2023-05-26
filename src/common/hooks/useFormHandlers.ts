import { cloneDeep, set, unset } from "lodash";

export default function useFormHandlers(formData, onChange) {
  // Handle text input changes
  const getTextChangeHandler = (field) => {
    return (e) => {
      // Probably can be optimized later
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

  // Handle switch/checkbox input changes
  const getSwitchChangeHandler = (field) => {
    return (e) => {
      const newFormData = cloneDeep(formData);
      set(newFormData, field, e.target.checked);
      onChange(newFormData);
    };
  };

  // Handle plain input changes
  const getChangeHandler = (field) => {
    return (newVal) => {
      const newFormData = cloneDeep(formData);
      set(newFormData, field, newVal);
      onChange(newFormData);
    };
  };

  return {
    getTextChangeHandler,
    getSwitchChangeHandler,
    getChangeHandler,
  };
}
