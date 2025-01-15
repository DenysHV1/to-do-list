import { IoClose, IoPencil } from "react-icons/io5";
import styles from './TaskList.module.css';

const TaskList = ({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
  editingTaskId,
  setEditingTaskId,
  editingText,
  setEditingText,
  taskStatuses,
}) => {
  return (
    <div className={styles.taskList}>
      {tasks?.length > 0 ? (
        <ul className={styles.list}>
          {tasks.map(({ task, id, status }) => (
            <li key={id} className={styles.item}>
              {editingTaskId === id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => onEdit(id, editingText)}
                  onKeyPress={(e) => e.key === "Enter" && onEdit(id, editingText)}
                  autoFocus
                />
              ) : (
                <p onClick={() => { setEditingTaskId(id); setEditingText(task); }}>
                  {task}
                </p>
              )}
              <div className={styles.controls}>
                <select
                  value={status}
                  onChange={(e) => onStatusChange(id, e.target.value)}
                >
                  {taskStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button onClick={() => onDelete(id)} className={styles.deleteButton}>
                  <IoClose size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>Список задач пуст! 😥</p>
      )}
    </div>
  );
};

export default TaskList;
