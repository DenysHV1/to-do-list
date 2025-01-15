import styles from './CompletedTasks.module.css';

const CompletedTasks = ({ completedTasks }) => {
  return (
    <div className={styles.completedTasks}>
      <h3>Выполненные задачи</h3>
      {completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id}>
              <span>{task.task}</span>
              <span>{task.completedAt}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет выполненных задач.</p>
      )}
    </div>
  );
};

export default CompletedTasks;
