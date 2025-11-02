import { useState } from "react";

const useInput = (initialValue?: string) => {
  const [value, setValue] = useState({
    value: initialValue ?? "",
    hasError: false,
  });

  const onChange = (value: string) => {
    setValue((prev) => ({
      ...prev,
      hasError: false,
      value,
    }));
  };

  const onErrorSet = () => {
    setValue((prev) => ({
      ...prev,
      hasError: true,
    }));
  };

  const onValueReset = () => {
    setValue((prev) => ({
      ...prev,
      value: "",
    }));
  };

  return [value, onChange, onErrorSet, onValueReset] as const;
};

export default useInput;
