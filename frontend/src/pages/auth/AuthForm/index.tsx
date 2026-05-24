import { useState } from "react";
import Field from "./Field";

type FieldSpec = { label: string; type: string };
type Values = Record<string, string>;

type AuthFormProps = {
  fields: FieldSpec[];
  submitButtonLabel: string;
  onSubmit: (values: Values) => Promise<void> | void;
};

const AuthForm = (props: AuthFormProps) => {
  const { fields, submitButtonLabel, onSubmit } = props;
  const [values, setValues] = useState<Values>(() => {
    const initialState: Values = {};
    for (const field of fields) {
      initialState[field.label] = "";
    }
    return initialState;
  });
  const [loading, setLoading] = useState(false);

  // "fields" prop comes from whatever form needs this component, like Signin or Signup.
  // This component will then render the Field component, passing along the same props it received from the Sign in/up page (label and type)

  return (
    <form
      className="bg-white border border-slate-200 rounded-lg m-4 p-4 font-garamond"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
      }}
    >
      {fields.map((field) => (
        <Field
          key={field.label}
          label={field.label}
          type={field.type}
          value={values[field.label]}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, [field.label]: e.target.value }));
          }}
        />
      ))}
      <button
        disabled={loading}
        className="bg-zinc-700 text-white w-full rounded-lg py-2 mt-4 relative disabled:bg-stone-400"
      >
        {submitButtonLabel}
        {loading && (
          <div className="absolute top-0 right-4 flex items-center h-full">
            <i className="fa-solid fa-spinner text-zinc-50 text-xl animate-spin" />
          </div>
        )}
      </button>
    </form>
  );
};

export default AuthForm;
