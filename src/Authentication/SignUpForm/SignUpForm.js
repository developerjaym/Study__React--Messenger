import "./SignUpForm.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { chatAppHttpClient } from "../../Extras/Utilities";

export default function SignUpForm({onTokenReceived}) {
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").max(64).min(3),
        email: yup.string().email("Must be valid email address").required("Must enter email").max(128).min(3),
        password: yup.string().required("Must enter a password").max(64).min(3),        
    });
    
      const formik = useFormik({
        initialValues: {
          username: "",
          email: "",
          password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            chatAppHttpClient.createChatter(values, onTokenReceived)
        },
      });
  return (
    <form className="form dialog__form" onSubmit={formik.handleSubmit}>
      <label className="label">
        <span>Desired Username</span>
        <input className="input" autoComplete="new-username" onChange={formik.handleChange}
            value={formik.values.username} name="username"/>
        <p className="form__error">{formik.errors.username}</p>
      </label>
      <label className="label">
        <span>Email Address</span>
        <input className="input" type="email" autoComplete="email" onChange={formik.handleChange}
            value={formik.values.email} name="email"/>
        <p className="form__error">{formik.errors.email}</p>
      </label>
      <label className="label">
        <span>Password</span>
        <input
          autoComplete="new-password"
          type="password"
          className="input"
          name="password"
          onChange={formik.handleChange}
            value={formik.values.password}
        />
        <p className="form__error">{formik.errors.password}</p>
      </label>
      <button className="button button--submit" type="submit">
        Sign Up
      </button>
    </form>
  );
}
