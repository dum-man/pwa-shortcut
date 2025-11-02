"use client";

import { useCallback, useRef } from "react";

import { useClickOutside, useMount } from "@/hooks";
import Portal from "@/lib/Portal";

import Layout from "./Layout";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popover = ({ isOpen, onClose, children }: IProps) => {
  const { isMounted } = useMount(isOpen);

  const ref = useRef(null);

  const handleClose = useCallback(() => onClose(), []);

  useClickOutside(ref, handleClose);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Layout isOpen={isOpen}>
        <div ref={ref}>{children}</div>
      </Layout>
    </Portal>
  );
};

export default Popover;
