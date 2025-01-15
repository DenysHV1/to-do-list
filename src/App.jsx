import { useEffect, useState } from "react";
import FormTask from "./components/FormTask/FormTask";
import TaskList from "./components/TaskList/TaskList";

function App() {
  const [tasks, setTask] = useState(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks?.length > 0 ? JSON.parse(localTasks) : []
  });

  const getTask = (taskFromForm) => {
    setTask((prevTask) => {
      return [...prevTask, taskFromForm];
    });
  };

  const handlerDeleteTask = (idTask) => {
    setTask((prevTask) => {
      return prevTask.filter(({ id }) => idTask !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <FormTask getTask={getTask} />
      <TaskList onDelete={handlerDeleteTask} tasks={tasks} />
    </>
  );
}

export default App;
