import React from "react";

function Labels(props: any) {
  const { text, color } = props;
  return (
    <span
      className={`text-[10px] uppercase leading-[12px] rounded-[20px] w-fit px-2 py-1  font-medium
      ${!color && "bg-slate-300"}
      ${color === "red" && "bg-red-100 text-red-500"}
      ${color === "green" && "bg-green-50 text-green-500"}
      `}
    >
      {text}
    </span>
  );
}

export default Labels;
