import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
  children: React.ReactNode;
}

const Portal = ({ children }: IProps) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
