import React from "react";

function Inputs(props: any) {
  const { ...rest } = props;
  return (
    <input
      className={`px-6 py-4 rounded-[4px] w-full outline-none border
        border-[#000000] focus:border-indigo-400  hover:border-indigo-400 placeholder:text-[#00000050]
      `}
      autoComplete="off"
      {...rest}
    />
  );
}

export default Inputs;

export const AuthInput = (props: any) => {
  const { error, register, name, ...rest } = props;
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        className={`pb-2 w-full outline-none border-b ${
          error
            ? "border-red-500"
            : "border-[#000000] focus:border-indigo-400  hover:border-indigo-400"
        } `}
        autoComplete="off"
        {...(register && register(name))}
        {...rest}
      />
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  );
};
