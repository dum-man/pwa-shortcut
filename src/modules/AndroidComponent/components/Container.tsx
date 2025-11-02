"use client";

import { useIsAndroid } from "@/hooks";
import AndroidComponent from "./AndroidComponent";

const Container = () => {
  const isAndroid = useIsAndroid();

  if (isAndroid) {
    return <AndroidComponent />;
  }

  return null;
};

export default Container;
