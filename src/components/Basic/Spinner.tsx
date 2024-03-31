import React from "react";

function Spinner(props: any) {
  const { white } = props;
  return (
    <span className={`loader ${white ? "border-white" : "border-[#303030]"}`} />
  );
}

export default Spinner;
