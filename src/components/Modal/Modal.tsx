import React from "react";

function Modal(props: any) {
  const { active, setActive, children } = props;
  return (
    <>
      {active && (
        <div className="h-screen w-screen bg-[#000000b2] fixed top-0 left-0 grid place-items-center z-[10000]">
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;
