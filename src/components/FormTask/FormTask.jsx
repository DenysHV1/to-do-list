import { Field, Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';
import styles from './FormTask.module.css';

const FormTask = ({ getTask }) => {
  const handleSubmit = ({ task }, action) => {
    if (!task.trim()) {
      toast.error('Field is empty!');
      return;
    }
    getTask({ task: task.trim(), id: uuidv4() });
    action.resetForm();
  };

  return (
    <>
      <Formik initialValues={{ task: "" }} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <Field name="task" placeholder="Your task ..." className={styles.input} />
          <button type="submit" className={styles.button}>Add</button>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
};

export default FormTask;
