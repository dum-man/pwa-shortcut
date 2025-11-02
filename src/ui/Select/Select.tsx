"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import ReactSelect, { GroupBase, Props } from "react-select";

import DropdownIndicator from "@/assets/arrow-down-circle-icon.svg";

import styles from "./styles.module.css";

interface IProps {
  label?: string;
  hasError?: boolean;
}

const Select = <
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>(
  props: Props<OptionType, IsMulti, GroupType> & IProps
) => {
  const { label, hasError, ...restProps } = props;

  const t = useTranslations("common");

  const id = useId();

  return (
    <div className={styles["wrapper"]}>
      <label className={styles["label"]} htmlFor={id}>
        {label}
      </label>
      <ReactSelect
        id={id}
        instanceId={id}
        isSearchable={false}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: "100%",
            height: "50px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: "2",
            borderRadius: "8px",
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            padding: "0",
            borderRadius: "8px",
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
          }),
        }}
        components={{
          DropdownIndicator: () => (
            <DropdownIndicator width={30} height={30} color="#3dd4c3" />
          ),
          IndicatorSeparator: () => null,
        }}
        {...restProps}
      />
      {hasError && (
        <span className={styles["error-message"]}>* {t("requiredField")}</span>
      )}
    </div>
  );
};

export default Select;
