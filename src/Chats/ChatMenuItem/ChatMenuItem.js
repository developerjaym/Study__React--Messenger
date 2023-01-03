import { Link } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import "./ChatMenuItem.css"

export default function ChatMenuItem({chat}) {
    return (
        <Link to={`/chats/${chat.id}`} className="chat-menu__item">
          <div className="chat__icon">{Icons.MESSAGE}</div>
          <div className="chat__preview">{`${chat.preview.user.username}: ${chat.preview.content}`}</div>
          <div className="chat__time">{chat.updatedAt}</div>
        </Link>
      );
}