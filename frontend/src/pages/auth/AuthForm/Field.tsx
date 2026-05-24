import type React from "react";

type FieldProps = {
    label: string,
    type: string,
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Field = (props: FieldProps) => {
  const { label, type, onChange } = props;

  return (
    <div className="flex flex-col my-4">
      <label htmlFor={label} className="text-slate-700 pl-1">
        {label}
      </label>
      <input
        id={label}
        type={type}
        onChange={onChange}
        className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 focus:outline-orange-700 w-64"
      />
    </div>
  );
};

export default Field;
