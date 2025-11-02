import { useState } from "react";
import { SingleValue } from "react-select";

const useSelect = () => {
  const [value, setValue] = useState({
    value: {
      label: "",
      value: "",
    },
    hasError: false,
  });

  const onChange = (
    value: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setValue((prev) => ({
      ...prev,
      hasError: false,
      value: {
        ...prev.value,
        ...value,
      },
    }));
  };

  const onErrorSet = () => {
    setValue((prev) => ({
      ...prev,
      hasError: true,
    }));
  };

  return [value, onChange, onErrorSet] as const;
};

export default useSelect;
