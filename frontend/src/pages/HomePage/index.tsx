import RedirectToSignInIfSignedOut from "../../shared-components/RedirectToSignInIfSignedOut";
import SessionContext from "../../contexts/SessionContext";
import { useCallback, useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import * as taskServices from "../../services/task";
import LoadingSpinner from "../../shared-components/LoadingSpinner";
import Button from "../../shared-components/Button";

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
        <div className="w-full max-w-5xl bg-zinc-500 flex flex-col relative items-center justify-start px-4 py-8">
          <Button
            label="Logout"
            fn={() => sessionContext.logOut()}
            positioning="absolute top-4 right-4"
          />
          <h1 className="text-5xl text-amber-300 font my-8 font-oswald ">
            Task Ulgo
          </h1>
          <div className="w-full flex mb-8">
            <input
              type="text"
              placeholder="add a new task ..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              className="bg-slate-100 py-4 px-4 rounded-md flex-1 text-xl"
            />
            <Button
              label="Create"
              fn={() => addTask(inputValue)}
              positioning="ml-4"
            />
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
