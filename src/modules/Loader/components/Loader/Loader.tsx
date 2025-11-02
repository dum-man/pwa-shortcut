"use client";

import { SomeComponent } from "@/components";
import { useAppSelector } from "@/hooks";
import { LoaderType } from "@/types/app";

import Renderer from "../Renderer/Renderer";

const Loader = () => {
  const { isOpen, type } = useAppSelector((state) => state.app.loader);

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize={type === LoaderType.SMALL ? "sm" : "xl"}
      closeOnClickOutside={false}
      withOverlay={type === LoaderType.SMALL}
      onClose={() => {}}
    >
      <Renderer loaderType={type} />
    </SomeComponent>
  );
};

export default Loader;
