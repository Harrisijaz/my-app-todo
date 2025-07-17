import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
import {
  createTodosapi,
  reteriveTodosbyIDapi,
  updatetodoapi,
} from "./ApisHandler/Todos_Integration";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
export default function UpdationTodo() {
  const authContext = useAuth();

  const [description, setdescription] = useState("");
  const [targetDate, settargetDate] = useState("");
  const username = authContext.username;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    gettingbyid();
  }, [id]);

  function gettingbyid() {
    if(id !=-1){
    reteriveTodosbyIDapi(username, id)
      .then((response) => {
        setdescription(response.data.description);
        settargetDate(response.data.targetDate);
      })

      .catch((error) => console.log(error))
      .finally(() => console.log("cleanup"));
    }
    }

  function onSubmit(values) {
    console.log(values);

    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    console.log(todo);

if(id==-1){

    createTodosapi(username, todo)
      .then((response) => {
        navigate("/todoslist");
      })
      .catch((error) => console.log(error));  
}
else{

    updatetodoapi(username, id, todo)
      .then((response) => {
        navigate("/todoslist");
      })
      .catch((error) => console.log(error));
  }
}
  function validate(values) {
    let errors = {
      // description : "Enter a valid Description",
      // targetDate : "Enter a valid Target Date"
    };
    if (values.description.length < 5 || values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
      errors.description = "enter at least 5 characters";
      errors.targetDate = "Enter a valid targetDate";
    }

    // console.log(values)
    return errors;
  }
  return (
    <div className="container">
      <h1>Enter Todo details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-3" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
