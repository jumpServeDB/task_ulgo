import clsx from "clsx";

type CheckboxProps = {
  status: boolean;
  id: string;
  setStatus: (id: string, status: boolean) => void;
};
export default function Checkbox(props: CheckboxProps) {
  const { status, id, setStatus } = props;
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        className="sr-only"
        checked={status}
        onChange={() => {
          setStatus(id, status);
        }}
      />
      <span
        className={clsx(
          "checkbox flex justify-center items-center w-4 h-4  border-2 p-2 rounded-md text-xl border-slate-300 hover:bg-amber-500 ",
          status ? "checkbox--active" : "",
        )}
        aria-hidden="true"
      >
        {status && <span className="checkmark">✓</span>}
      </span>
    </label>
  );
}
