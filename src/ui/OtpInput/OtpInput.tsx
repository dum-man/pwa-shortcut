"use client";

import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import styles from "./styles.module.css";

interface IProps {
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
  otpCode: string[];
  setOtpCode: Dispatch<SetStateAction<string[]>>;
}

const OtpInput = ({ hasError, setHasError, otpCode, setOtpCode }: IProps) => {
  const inputRefs = useRef<HTMLInputElement[] | null[]>(
    new Array(otpCode.length)
  );

  const codeLength = otpCode.length;

  const handleSetOtpCode = (index: number, value: string) => {
    setOtpCode((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleFocusNextInput = (index: number) => {
    if (index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === codeLength - 1) {
      inputRefs.current[codeLength - 1]?.blur();
    }
  };

  const handlePaste = (value: string) => {
    setOtpCode(value.split(""));
    inputRefs.current?.forEach((item) => item?.blur());
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    if (hasError) {
      setHasError(false);
    }

    if (value.length === 1) {
      handleSetOtpCode(index, value);
      handleFocusNextInput(index);
    } else if (value.length === 2) {
      handleSetOtpCode(index, value[1]);
      handleFocusNextInput(index);
    } else if (value.length === codeLength) {
      handlePaste(value);
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace") {
      setOtpCode((prev) => {
        const copy = [...prev];
        copy[index] = "";
        return copy;
      });
      if (!otpCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setOtpCode((prev) => {
          const copy = [...prev];
          copy[index - 1] = "";
          return copy;
        });
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [hasError]);

  return (
    <div className={styles["wrapper"]}>
      {otpCode.map((digit, idx) => (
        <input
          key={idx}
          className={classNames(styles["input"], {
            [styles["error"]]: hasError,
          })}
          type="text"
          autoComplete="one-time-code"
          inputMode="decimal"
          //@ts-ignore
          ref={(ref) => (inputRefs.current[idx] = ref)}
          value={digit}
          onChange={(event) => handleChange(idx, event.target.value)}
          onKeyDown={(event) => handleKeyDown(idx, event.nativeEvent.key)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
