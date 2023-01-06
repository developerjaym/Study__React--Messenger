import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster, ToastMoods } from "../Extras/Toast/Toaster";
import { Utilities } from "../Extras/Utilities";
import Page from "../Page/Page";
import "./AuthPage.css";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";

export default function AuthPage() {
  const [existingUser, setExistingUser] = useState(true);
  const navigate = useNavigate();
  const onTokenReceived = (token) => {
    Utilities.authToken = token;
    toaster.createToast("Success!", ToastMoods.happy);
    navigate("/");
  };
  return (
    <Page pageTitle="Authenticate">
      <div className="authentication-container">
        {existingUser ? (
          <LoginForm onTokenReceived={onTokenReceived} />
        ) : (
          <SignUpForm onTokenReceived={onTokenReceived} />
        )}
        <button
          className="button button--link"
          onClick={(e) => setExistingUser(!existingUser)}
        >
          {existingUser
            ? "Need to create an account?"
            : "Already have an account?"}
        </button>
      </div>
    </Page>
  );
}
