"use client";

import { useMount } from "@/hooks";
import Portal from "@/lib/Portal";

import Layout from "./Layout/Layout";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dropdown = ({ isOpen, onClose, children }: IProps) => {
  const { isMounted } = useMount(isOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Layout isOpen={isOpen} onClose={onClose}>
        <div>{children}</div>
      </Layout>
    </Portal>
  );
};

export default Dropdown;
