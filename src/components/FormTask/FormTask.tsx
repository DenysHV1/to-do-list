import { Field, Form, Formik, FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import styles from "./FormTask.module.css";
import { ITask } from "../../App";
import { FC } from "react";

interface IFormTaskProps {
  getTask: (taskFromForm: ITask) => void;
  editingTaskId: string | null;
  editingText: string;
}

const FormTask: FC<IFormTaskProps> = ({
  getTask,
  editingTaskId,
  editingText,
}) => {
  const handleSubmit = (
    values: { task: string },
    actions: FormikHelpers<{ task: string }>
  ) => {
    if (!values.task.trim()) {
      toast.error("Field is empty!");
      return;
    }

    getTask({ task: values.task.trim(), id: editingTaskId ?? uuidv4() });
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ task: editingText }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className={styles.form}>
          <Field
            name="task"
            placeholder="Your task ..."
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {editingTaskId ? "Update" : "Add"}
          </button>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
};

export default FormTask;
