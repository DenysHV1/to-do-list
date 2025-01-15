import { Field, Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';

const FormTask = ({ getTask }) => {

  const handleSubmit = ({ task }, action) => {
    if (!task.trim()) {
		toast.error('Field is empty!')
      return;
    }
    getTask({ task: task.trim(), id: uuidv4() });

    action.resetForm();
  };

  return (
	<>
    <Formik initialValues={{ task: "" }} onSubmit={handleSubmit}>
      <Form>
        <Field name="task" placeholder="Your task ..." />
        <button type="submit">Add</button>
      </Form>
    </Formik>
	<Toaster/>
	</>

  );
};

export default FormTask;
