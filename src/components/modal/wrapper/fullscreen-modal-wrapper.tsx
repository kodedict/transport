import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  open: boolean;
}

const FullscreenModalWrapper = ({ children, open }: LayoutProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50  transition-opacity duration-500 ease-in-out 
        ${open ? "opacity-100 visible bg-black bg-opacity-50" : "opacity-0 invisible"}`}
    >
      <div
        className={`w-full h-full max-w-2xl bg-white transition-transform duration-300 ease-in-out p-10 overflow-y-auto
        ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FullscreenModalWrapper;
