import "./LoginForm.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { chatAppHttpClient } from "../../Extras/Utilities";

export default function LoginForm({ onTokenReceived }) {
  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username").max(64).min(3),
    password: yup.string().required("Must enter a password").max(64).min(3),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      chatAppHttpClient.getToken(values, onTokenReceived);
    },
  });
  return (
    <form className="form dialog__form" onSubmit={formik.handleSubmit}>
      <label className="label">
        <span>Username</span>
        <input
          className="input"
          autoComplete="current-username"
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
        />
        <p className="form__error">{formik.errors.username}</p>
      </label>
      <label className="label">
        <span>Password</span>
        <input
          autoComplete="current-password"
          type="password"
          className="input"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p className="form__error">{formik.errors.password}</p>
      </label>
      <button className="button button--submit" type="submit">
        Sign In
      </button>
    </form>
  );
}
