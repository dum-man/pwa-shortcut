"use client";

import { useMount } from "@/hooks";
import Portal from "@/lib/Portal";
import { Backdrop } from "@/ui";

interface IProps {
  isOpen: boolean;
  contentSize: "sm" | "md" | "xl";
  closeOnClickOutside: boolean;
  withOverlay: boolean;
  displayCloseBtn?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SomeComponent = ({
  isOpen,
  contentSize,
  closeOnClickOutside,
  withOverlay,
  displayCloseBtn,
  onClose,
  children,
}: IProps) => {
  const { isMounted } = useMount(isOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Backdrop
        isOpen={isOpen}
        contentSize={contentSize}
        closeOnClickOutside={closeOnClickOutside}
        withOverlay={withOverlay}
        displayCloseBtn={displayCloseBtn}
        onClose={onClose}
      >
        {children}
      </Backdrop>
    </Portal>
  );
};

export default SomeComponent;
