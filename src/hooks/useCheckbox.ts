import { useState } from "react";

const useCheckbox = (defaultValue: boolean) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(evt.target.checked);
  };

  return [isChecked, onChange] as const;
};

export default useCheckbox;
