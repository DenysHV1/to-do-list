import { useEffect, useState } from "react";
import FormTask from "./components/FormTask/FormTask";
import TaskList from "./components/TaskList/TaskList";
import DeletedTasks from "./components/DeletedTasks/DeletedTasks";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import './index.css';
import { v4 as uuidv4 } from "uuid";

const taskStatuses = ["Начал делать", "Половина", "Отвлёкся", "Почти готова", "Готова"];

function App() {
  // Загрузка данных из localStorage при инициализации
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks ? JSON.parse(localTasks) : [];
  });

  const [deletedTasks, setDeletedTasks] = useState(() => {
    const localDeletedTasks = localStorage.getItem("deletedTasks");
    return localDeletedTasks ? JSON.parse(localDeletedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const localCompletedTasks = localStorage.getItem("completedTasks");
    return localCompletedTasks ? JSON.parse(localCompletedTasks) : [];
  });

  const [editingTaskId, setEditingTaskId] = useState(null); // ID редактируемой задачи
  const [editingText, setEditingText] = useState(""); // Текст редактируемой задачи

  // Сохранение задач в localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [deletedTasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Добавление новой задачи
  const getTask = (taskFromForm) => {
    setTasks((prevTasks) => [...prevTasks, { ...taskFromForm, status: "Начал делать" }]);
  };

  // Удаление задачи
  const handleDeleteTask = (idTask) => {
    const taskToDelete = tasks.find((task) => task.id === idTask);
    if (window.confirm("Вы уверены, что хотите удалить задачу?")) {
      setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== idTask));
      setDeletedTasks((prevDeleted) => {
        const newDeleted = [taskToDelete, ...prevDeleted];
        return newDeleted.slice(0, 10); // Ограничиваем список 10 элементами
      });
    }
  };

  // Редактирование задачи
  const handleEditTask = (idTask, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idTask ? { ...task, task: newText } : task
      )
    );
    setEditingTaskId(null); // Завершаем редактирование
  };

  // Изменение состояния задачи
  const handleStatusChange = (idTask, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idTask ? { ...task, status: newStatus } : task
      )
    );

    // Если задача выполнена, перемещаем её в список выполненных
    if (newStatus === "Готова") {
      const completedTask = tasks.find((task) => task.id === idTask);
      setCompletedTasks((prevCompleted) => {
        const newCompleted = [
          { ...completedTask, completedAt: new Date().toLocaleString() },
          ...prevCompleted,
        ];
        return newCompleted.slice(0, 50); // Ограничиваем список 50 элементами
      });
      setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== idTask));
    }
  };

  // Восстановление удаленной задачи
  const handleRestoreTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setDeletedTasks((prevDeleted) => prevDeleted.filter((t) => t.id !== task.id));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <FormTask getTask={getTask} />
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
