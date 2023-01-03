import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../Authentication/AuthModal";
import { Icons } from "../Extras/Icons";
import Modal from "../Extras/Modal/Modal";
import { toaster, ToastMoods } from "../Extras/Toast/Toaster";
import Page from "../Page/Page";
import Search from "../Search/Search";
import "./MainMenu.css";
export default function MainMenu() {
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
      <AuthModal/>
    </Page>
  );
}
