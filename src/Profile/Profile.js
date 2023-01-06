import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import Page from "../Page/Page";
import "./Profile.css";

export default function Profile() {
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name").max(15),
    age: yup
      .number()
      .positive()
      .integer()
      .required("Must enter age")
      .typeError("Please enter an Integer")
      .max(125),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // TODO make users endpoint
      fetch("users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 200) {
          // TODO route
        }
      });
    },
  });

  return (
    <Page pageTitle="Profile" backRoute="/">
      <form
        className="form profile__form"
        onSubmit={formik.handleSubmit}
        
      >
        <label className="label">
          Email Address
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="input"
          />
          <p className="form__error"> {formik.errors.email}</p>
        </label>

        <label className="label">
          Name
          <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="input"
          />
          <p className="form__error"> {formik.errors.name}</p>
        </label>

        <label className="label">
          age
          <input
            id="age"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            className="input"
          />
          <p className="form__error"> {formik.errors.age}</p>
        </label>

        <button type="submit" className="button button--submit">💾 Save</button>
      </form>
    </Page>
  );
}
