"use client";

import classNames from "classnames";
import ReactSlider, { ReactSliderProps } from "react-slider";

import "./slider.css";

interface IProps extends ReactSliderProps {
  variant?: "primary" | "secondary" | "tertiary";
  adaptive?: boolean;
}

const Slider = (props: IProps) => {
  const {
    variant = "primary",
    adaptive = true,
    className,
    ...restProps
  } = props;

  return (
    <ReactSlider
      ariaLabel="Выберите значение"
      className={classNames("slider", className, {
        ["adaptive-slider"]: adaptive,
      })}
      trackClassName={classNames("slider-track", {
        ["slider-track-primary"]: variant === "primary",
        ["slider-track-secondary"]: variant === "secondary",
        ["slider-track-tertiary"]: variant === "tertiary",
      })}
      thumbClassName={classNames("slider-thumb", {
        ["slider-thumb-primary"]: variant === "primary",
        ["slider-thumb-secondary"]: variant === "secondary",
        ["slider-thumb-tertiary"]: variant === "tertiary",
      })}
      {...restProps}
    />
  );
};

export default Slider;
