import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Users from "./Users";
import Axios from "axios";
import formSchema from "./formSchema";
import * as yup from "yup";

const initialFormValues = {
    id:"",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  terms: false,
};
const initialFormErrors = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};
const initialUsers = [];
const initialDisabled = true;

function Form(props) {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    Axios.get("https://reqres.in/api/users")

      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const postNewUser = (newUser) => {
    Axios.post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    yup
      .reach(formSchema, name)
      .validate(evt.target.value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const onCheckboxChange = (evt) => {
    const { name } = evt.target;
    const { checked } = evt.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };
  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      id: uuid(),
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email,
      password: formValues.password,
      terms: formValues.terms === true,
    };
    postNewUser(newUser);
  };
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button disabled={disabled}>Submit</button>
        <div className="errors">
          <div>{formErrors.first_name}</div>
          <div>{formErrors.last_name}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
          <div>{formErrors.terms}</div>
        </div>
        <div>
          <label>
            First Name&nbsp;
            <input
              type="text"
              name="first_name"
              value={formValues.first_name}
              onChange={onInputChange}
            />
          </label>
          <label>
            Last Name&nbsp;
            <input
              type="text"
              name="last_name"
              value={formValues.last_name}
              onChange={onInputChange}
            />
          </label>
          <label>
            Email&nbsp;
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={onInputChange}
            />
          </label>
          <label>
            Password&nbsp;
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={onInputChange}
            />
          </label>
          <label>
            I agree to terms and services
            <input
              type="checkbox"
              name="terms"
              value={formValues.terms}
              onChange={onCheckboxChange}
            />
          </label>
        </div>
      </form>
      <div>
        {users.map((user) => {
          return <Users key={user.id} details={user} />;
        })}
      </div>
    </div>
  );
}

export default Form;
