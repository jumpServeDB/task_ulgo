import { useState } from "react";
import type { Task } from ".";
import Checkbox from "../../shared-components/Checkbox";
import clsx from "clsx";
type TaskItemProps = {
  task: Task;
};

export default function TaskItem(props: TaskItemProps) {
  const { task } = props;
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="flex justify-between items-center text-zinc-100 text-xl border-2 border-amber-500 w-full px-6 py-4 my-2 rounded-md">
      <div className="flex items-center">
        <Checkbox status={isComplete} setStatus={setIsComplete} />
        <div
          className={clsx("px-4 pt-2 pb-3 ", isComplete ? "text-zinc-500" : "")}
        >
          {task.title}
        </div>
      </div>
      <button className="text-sm text-slate-400 hover:text-red-500 flex justify-center cursor-pointer">
        <i className=" mr-1 fa-solid fa-trash text-base" />
        <div>remove</div>
      </button>
    </div>
  );
}
