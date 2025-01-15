import { useEffect, useState } from "react";
import FormTask from "./components/FormTask/FormTask";
import TaskList from "./components/TaskList/TaskList";
import './index.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks?.length > 0 ? JSON.parse(localTasks) : [];
  });

  const getTask = (taskFromForm) => {
    setTasks((prevTasks) => [...prevTasks, taskFromForm]);
  };

  const handleDeleteTask = (idTask) => {
    setTasks((prevTasks) => prevTasks.filter(({ id }) => idTask !== id));
  };

  const handleEditTask = (idTask, newTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idTask ? { ...task, task: newTask } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <FormTask getTask={getTask} />
      <TaskList
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        tasks={tasks}
      />
    </div>
  );
}

export default App; 
