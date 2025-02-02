import { useEffect, useState } from "react";

import "./index.css";
import Background from "./components/Background/Background";
import FormTask from "./components/FormTask/FormTask";
import TaskList from "./components/TaskList/TaskList";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import DeletedTasks from "./components/DeletedTasks/DeletedTasks";

const taskStatuses: string[] = [
  "Начал делать",
  "Половина",
  "Отвлёкся",
  "Почти готова",
  "Готова",
];

export interface ITask {
  task: string;
  id: string;
  status?: string;
}

export interface ICompletedTask extends ITask {
  completedAt: string;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks ? JSON.parse(localTasks) : [];
  });

  const [deletedTasks, setDeletedTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ICompletedTask[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getTask = (taskFromForm: ITask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...taskFromForm, status: "Начал делать" },
    ]);
  };

  const handleDeleteTask = (idTask: string) => {
    const taskToDelete = tasks.find((task) => task.id === idTask);
    if (taskToDelete && confirm("Вы уверены, что хотите удалить задачу?")) {
      setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== idTask));
      setDeletedTasks((prevDeleted) => {
        const newDeleted = [taskToDelete, ...prevDeleted];
        return newDeleted.slice(0, 10);
      });
    }
  };

  const handleEditTask = (idTask: string, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idTask ? { ...task, task: newText } : task
      )
    );
    setEditingTaskId(null);
  };

  const handleStatusChange = (idTask: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idTask ? { ...task, status: newStatus } : task
      )
    );

    if (newStatus === "Готова") {
      const completedTask = tasks.find((task) => task.id === idTask);
      if (completedTask) {
        setCompletedTasks((prevCompleted) => {
          const newCompleted: ICompletedTask[] = [
            { ...completedTask, completedAt: new Date().toLocaleString() },
            ...prevCompleted,
          ];
          return newCompleted.slice(0, 50);
        });
        setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== idTask));
      }
    }
  };

  const handleRestoreTask = (task: ITask) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setDeletedTasks((prevDeleted) =>
      prevDeleted.filter((t) => t.id !== task.id)
    );
  };

  return (
    <div className="app">
      <Background />
      <h1>To-Do List</h1>
      <FormTask
        getTask={getTask}
        editingTaskId={editingTaskId}
        editingText={editingText}
      />
      <div className="tasks-container">
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onStatusChange={handleStatusChange}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
          editingText={editingText}
          setEditingText={setEditingText}
          taskStatuses={taskStatuses}
        />
        <CompletedTasks completedTasks={completedTasks} />
      </div>
      <DeletedTasks deletedTasks={deletedTasks} onRestore={handleRestoreTask} />
    </div>
  );
}

export default App;
