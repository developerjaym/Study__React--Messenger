import "./LoginForm.css";

export default function LoginForm() {
    return (<form className="form dialog__form">
    <label className="label">
      <span>Username</span>
      <input autoComplete="username" className="input" />
      <p className="form__error"></p>
    </label>
    <label className="label">
      <span>Password</span>
      <input
        autoComplete="current-password"
        type="password"
        className="input"
      />
      <p className="form__error"></p>
    </label>
    <button className="button button--submit" type="submit">
      Login
    </button>
  </form>)
}