import styles from './DeletedTasks.module.css';

const DeletedTasks = ({ deletedTasks, onRestore }) => {
  return (
    <div className={styles.deletedTasks}>
      <h3>Удаленные задачи</h3>
      {deletedTasks.length > 0 ? (
        <ul>
          {deletedTasks.map((task) => (
            <li key={task.id}>
              <span>{task.task}</span>
              <button onClick={() => onRestore(task)}>Восстановить</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет удаленных задач.</p>
      )}
    </div>
  );
};

export default DeletedTasks;
