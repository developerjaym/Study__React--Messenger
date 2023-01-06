import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { chatAppHttpClient } from "../../Extras/Utilities";
import Page from "../../Page/Page";
import "./CreateGame.css";

export default function CreateGame() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(32),
    link: yup.string().required("Must enter a link").max(256),
    image: yup.string().required("Must enter an image").max(256)
  });
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      link: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      chatAppHttpClient.createGameForUser(values, () => {
        navigate("/games")
      })
    },
  });

  return (
    <Page pageTitle="Add Game" backRoute="/games">
      <form
        className="form profile__form"
        onSubmit={formik.handleSubmit}
        
      >
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
          Link to the Game
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
          Image for the Game
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

        <button type="submit" className="button button--submit">💾 Save</button>
      </form>
    </Page>
  );
}
