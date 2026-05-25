import RedirectToSignInIfSignedOut from "../../shared-components/RedirectToSignInIfSignedOut";
import SessionContext from "../../contexts/SessionContext";
import { useContext } from "react";
import TaskItem from "./TaskItem";

export type Task = {
  title: string;
  status: boolean;
};

const tasks: Task[] = [
  {
    title: "do the laundry",
    status: false,
  },
  {
    title: "walk the dog",
    status: false,
  },
  {
    title: "make the kids' lunches",
    status: false,
  },
  {
    title: "clear up the garden",
    status: false,
  },
];

export default function HomePage() {
  const sessionContext = useContext(SessionContext);
  return (
    <RedirectToSignInIfSignedOut>
      <div className="flex bg-orange-950 justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-zinc-800 flex flex-col relative items-center justify-start px-4">
          <h1 className="text-3xl text-amber-500 my-8">Task Ulgo</h1>
          <button
            className="absolute top-4 right-4 bg-slate-100 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100"
            onClick={() => sessionContext.logOut()}
          >
            Logout
          </button>
          {tasks.map((task: Task, idx: number) => (
            <TaskItem task={task} key={idx} />
          ))}
        </div>
      </div>
    </RedirectToSignInIfSignedOut>
  );
}
