import { Link } from "react-router-dom";
import Page from "../Page/Page";
import "./MainMenu.css";
import { useEffect, useRef } from "react";
import { toaster, ToastMoods } from "../Extras/Toast/Toaster";
import Search from "../Search/Search";
import { Icons } from "../Extras/Icons";
import Modal from "../Extras/Modal/Modal";
export default function MainMenu() {
  const dialog = useRef(null);
  useEffect(() => {
    toaster.createToast("Welcome to Chat", ToastMoods.happy);
  }, []);
  return (
    <Page transparent={true}>
      <div className="menu">
        <nav className="menu__area menu__area--others">
          <Link to="games" className="menu__item">
            <span className="item__icon">{Icons.GAME}</span>
            <label className="item__title">Games</label>
          </Link>
        </nav>

        <nav className="menu__area menu__area--favorites">
          <Link to="chats" className="menu__item">
            <span className="item__icon">{Icons.MESSAGE}</span>
            <label className="item__title">Chat</label>
          </Link>
          <Link to="friends" className="menu__item">
            <span className="item__icon">{Icons.FRIENDS}</span>
            <label className="item__title">Friends</label>
          </Link>
          <Link to="profile" className="menu__item">
            <span className="item__icon">{Icons.PROFILE}</span>
            <label className="item__title">Profile</label>
          </Link>
        </nav>
        <Search label="Search Google" />
      </div>
      <Modal modalTitle="Login">
        <form className="form dialog__form">
          <label className="label">
            <span>Screenname</span>
            <input className="input" />
            <p className="form__error"></p>
          </label>
          <label className="label">
            <span>Password</span>
            <input type="password" className="input" />
            <p className="form__error"></p>
          </label>
          <button className="button button--submit" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </Page>
  );
}
