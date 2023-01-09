import { Link } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import "./FriendMenuItem.css";

export default function FriendMenuItem({ friend }) {
  return (
    <Link to={`/friends/${friend.username}`} className="friend-menu__item">
      <div className="friend__icon">{Icons.PROFILE}</div>
      <div className="friend__name">{friend.username}</div>
    </Link>
  );
}
