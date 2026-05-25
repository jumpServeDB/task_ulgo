import clsx from "clsx";

type ButtonProps = {
  label: string;
  fn: () => void;
  positioning: string;
};
export default function Button(props: ButtonProps) {
  const { label, fn, positioning } = props;
  return (
    <button
      onClick={fn}
      className={clsx(
        "bg-slate-100 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100",
        positioning,
      )}
    >
      {label}
    </button>
  );
}
