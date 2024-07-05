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

export const TextInput = (props: any) => {
  const { error, register, label, name, ...rest } = props;
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        <div>{label}</div>
      </label>
      <input
        className={`p-2 px-4 rounded-md w-full outline-none border bg-[#F5F5F5] text-[#00000084]
            border-[#F5F5F5] focus:border-indigo-400  hover:border-indigo-4 `}
        autoComplete="off"
        id={name}
        {...(register && register(name))}
        {...rest}
      />
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  );
};

export const TextAreaInput = (props: any) => {
  const { error, register, label, name, ...rest } = props;
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        <div>{label}</div>
      </label>
      <textarea
        className={`p-2 px-4 rounded-md w-full outline-none border
            border-[#000000] focus:border-indigo-400  hover:border-indigo-4 `}
        autoComplete="off"
        id={name}
        {...(register && register(name))}
        {...rest}
      />
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  );
};

export const SelectInput = (props: any) => {
  const { error, register, options, label, name, ...rest } = props;
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        <div>{label}</div>
      </label>
      <select
        name={name}
        id={name}
        {...(register && register(name))}
        {...rest}
        className={`p-2 px-4 rounded-md w-full outline-none border
        border-[#000000] focus:border-indigo-400  hover:border-indigo-4 `}
      >
        {options?.map((e: any) => {
          return <option value={e.value}>{e.label}</option>;
        })}
      </select>

      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  );
};

export const RadioInput = (props: any) => {
  const { options, value, name, setValue } = props;
  return (
    <div className="flex flex-col gap-5">
      {options?.map((item: any) => {
        return (
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name={name}
              value={item.value}
              id={item.value}
              className="h-4 w-4 cursor-pointer"
              checked={value === item.value}
              onClick={() => {
                setValue(item.value);
              }}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        );
      })}
    </div>
  );
};
