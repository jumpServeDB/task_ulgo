import RedirectToSignInIfSignedOut from "../../shared-components/RedirectToSignInIfSignedOut";
import SessionContext from "../../contexts/SessionContext";
import { useCallback, useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import * as taskServices from "../../services/task";
import LoadingSpinner from "../../shared-components/LoadingSpinner";

export type Task = {
  title: string;
  completed: boolean;
  _id: string;
};

export default function HomePage() {
  const sessionContext = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [inputValue, setInputValue] = useState("");

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    const response = await taskServices.getTasks();
    const data = await response.json();
    console.log(data);
    setTasks(data);
    console.log(tasks);
    setIsLoading(false);
  }, []);

  const addTask = async (title: string) => {
    setIsLoading(true);
    const response = await taskServices.addTask(title);
    const data = await response.json();
    console.log(data);
    getTasks();
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    const response = await taskServices.deleteTask(id);
    const data = await response.json();
    console.log(data);
    getTasks();
  };

  const updateTask = async (id: string, completed: boolean) => {
    setIsLoading(true);
    const response = await taskServices.updateTask(id, !completed);
    const data = await response.json();
    console.log(data);
    getTasks();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks();
    };
    fetchTasks();
  }, [getTasks]);

  return (
    <RedirectToSignInIfSignedOut>
      <div className="flex bg-orange-950 justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-zinc-500 flex flex-col relative items-center justify-start px-4">
          <h1 className="text-3xl text-amber-500 font-bold my-8">Task Ulgo</h1>
          <div className="w-full flex mb-8">
            <button
              className="absolute top-4 right-4 bg-slate-100 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100"
              onClick={() => sessionContext.logOut()}
            >
              Logout
            </button>
            <input
              type="text"
              placeholder="add a new task ..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              className="bg-slate-100 py-4 px-4 rounded-md flex-1 text-xl"
            />
            <button
              className=" bg-slate-100 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100 ml-4"
              onClick={() => addTask(inputValue)}
            >
              Create
            </button>
          </div>
          <div className=" w-full h-full flex flex-col items-center justify-start">
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              tasks &&
              tasks.length > 0 &&
              tasks.map((task: Task) => (
                <TaskItem
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  key={task._id}
                />
              ))}

            {!isLoading && tasks && tasks.length === 0 && (
              <p>add some tasks to get started!</p>
            )}
          </div>
        </div>
      </div>
    </RedirectToSignInIfSignedOut>
  );
}
