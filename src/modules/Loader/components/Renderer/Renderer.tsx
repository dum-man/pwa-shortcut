import { useState } from "react";

import { LoaderType } from "@/types/app";

import FullLoader from "../FullLoader/FullLoader";
import SmallLoader from "../SmallLoader/SmallLoader";

interface IProps {
  loaderType: LoaderType | undefined;
}

const Renderer = ({ loaderType }: IProps) => {
  const [type] = useState(() => loaderType);

  if (type === LoaderType.SMALL) {
    return <SmallLoader />;
  }

  if (type === LoaderType.FULL) {
    return <FullLoader />;
  }

  return null;
};

export default Renderer;
