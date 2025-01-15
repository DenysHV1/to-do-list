import { IoClose, IoPencil } from "react-icons/io5";
import styles from './TaskList.module.css';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <>
      {tasks?.length > 0 ? (
        <ul className={styles.list}>
          {tasks.map(({ task, id }) => (
            <li key={id} className={styles.item}>
              <p>{task}</p>
              <div>
                <button onClick={() => onEdit(id)} className={styles.editButton}>
                  <IoPencil size={16} />
                </button>
                <button onClick={() => onDelete(id)} className={styles.deleteButton}>
                  <IoClose size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>List is empty! 😥</p>
      )}
    </>
  );
};

export default TaskList;
