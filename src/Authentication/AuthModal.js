import { useState } from "react";
import Modal from "../Extras/Modal/Modal";
import "./AuthModal.css";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";

export default function AuthModal({onTokenReceived}) {
    const [existingUser, setExistingUser] = useState(true)
  return (
    <Modal modalTitle="Authenticate">
      {existingUser ? <LoginForm/> : <SignUpForm onTokenReceived={onTokenReceived}/>}
      <button className="button button--link" onClick={e => setExistingUser(!existingUser)}>
        {existingUser ? 'Need to create an account?' : 'Already have an account?'}
      </button>
    </Modal>
  );
}
