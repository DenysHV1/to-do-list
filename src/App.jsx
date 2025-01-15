import { useEffect, useState } from "react";
import FormTask from "./components/FormTask/FormTask";
import TaskList from "./components/TaskList/TaskList";
import './index.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks?.length > 0 ? JSON.parse(localTasks) : [];
  });

  const [editingTask, setEditingTask] = useState(null); // Состояние для редактирования

  const getTask = (taskFromForm) => {
    if (editingTask) {
      // Если задача редактируется, обновляем её
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, task: taskFromForm.task } : task
        )
      );
      setEditingTask(null); // Сбрасываем состояние редактирования
    } else {
      // Иначе добавляем новую задачу
      setTasks((prevTasks) => [...prevTasks, taskFromForm]);
    }
  };

  const handleDeleteTask = (idTask) => {
    setTasks((prevTasks) => prevTasks.filter(({ id }) => idTask !== id));
  };

  const handleEditTask = (idTask) => {
    const taskToEdit = tasks.find((task) => task.id === idTask);
    setEditingTask(taskToEdit); // Устанавливаем задачу для редактирования
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <FormTask getTask={getTask} editingTask={editingTask} />
      <TaskList
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
