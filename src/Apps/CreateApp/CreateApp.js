import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { chatAppHttpClient } from "../../Extras/Utilities";
import Page from "../../Page/Page";
import "./CreateApp.css";

export default function CreateApp() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(32),
    link: yup.string().required("Must enter a link").max(256),
    image: yup.string().required("Must enter an image").max(256),
    description: yup.string().required("Must enter a description").max(256)
  });
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      link: "",
      image: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      chatAppHttpClient.createApp(values, () => {
        navigate("/apps")
      })
    },
  });

  return (
    <Page pageTitle="Publish App" backRoute="/apps">
      <form
        className="form profile__form"
        onSubmit={formik.handleSubmit}
        
      >
      <p className="form__instructions">
        Be sure the app allows iframing.
      </p>
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
          Link to the App
          <input
            id="link"
            name="link"
            onChange={formik.handleChange}
            value={formik.values.link}
            className="input"
            type="url"
          />
          <p className="form__error"> {formik.errors.link}</p>
        </label>
        <label className="label">
          Image for the App
          <input
            id="image"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
            className="input"
            type="url"
          />
          <p className="form__error"> {formik.errors.image}</p>
        </label>
        <label className="label">
          Description of the App
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="input"
          >
          </textarea>
          <p className="form__error"> {formik.errors.description}</p>
        </label>
        <button type="submit" className="button button--submit">Publish</button>
      </form>
    </Page>
  );
}
