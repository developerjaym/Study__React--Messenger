import "./SignUpForm.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { Utilities } from "../../Extras/Utilities";

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
            console.log(values);
          // TODO send to my API
          // THEN get the token
          // THEN toast
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          var raw = JSON.stringify(values);
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(Utilities.CORS_PROXY + "https://jayman.pythonanywhere.com/account", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        //   fetch("users", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(values, null, 2),
        //   }).then((res) => {
        //     if (res.status === 200) {
        //       // TODO route
        //     }
        //   });
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
