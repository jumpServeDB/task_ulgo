import type { Task } from ".";
import Checkbox from "../../shared-components/Checkbox";
import clsx from "clsx";
type TaskItemProps = {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, status: boolean) => void;
};

export default function TaskItem(props: TaskItemProps) {
  const { task, deleteTask, updateTask } = props;

  return (
    <div className="flex justify-between items-center text-zinc-100 bg-zinc-700 text-xl border-2 border-amber-500 w-full px-6 py-3 my-2 rounded-md">
      <div className="flex items-center">
        <Checkbox
          status={task.completed}
          id={task._id}
          setStatus={updateTask}
        />
        <div
          className={clsx(
            "px-4 pt-2 pb-3 ",
            task.completed ? "text-zinc-500" : "",
          )}
        >
          {task.title}
        </div>
      </div>
      <button
        className="text-sm text-slate-400 hover:text-red-500 flex justify-center cursor-pointer p-2 items-center"
        onClick={() => deleteTask(task._id)}
      >
        <i className=" mr-1 fa-solid fa-trash text-base" />
        <div>remove</div>
      </button>
    </div>
  );
}
