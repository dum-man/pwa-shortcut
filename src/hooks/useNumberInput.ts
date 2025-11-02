import { useState } from "react";
import { NumberFormatValues } from "react-number-format";

const useNumberInput = (defaultValue?: string) => {
  const [value, setValue] = useState({
    value: defaultValue ?? "",
    hasError: false,
  });

  const onChange = (values: NumberFormatValues) => {
    setValue((prev) => ({
      ...prev,
      hasError: false,
      value: values.value,
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

export default useNumberInput;
