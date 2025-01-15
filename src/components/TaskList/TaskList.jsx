import { IoClose } from "react-icons/io5";

const TaskList = ({ tasks, onDelete }) => {
  return (
    <>
      {tasks?.length > 0 ? (
        <ul>
          {tasks.map(({ task, id }) => (
            <li key={id}>
              <p>{task}</p>
              <button onClick={() => onDelete(id)}>
                <IoClose />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>List is empty!😥</p>
      )}
    </>
  );
};

export default TaskList;
