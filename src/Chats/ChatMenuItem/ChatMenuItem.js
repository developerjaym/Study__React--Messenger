import { Link } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import "./ChatMenuItem.css"

export default function ChatMenuItem({chat}) {
  const chatPreview = `${chat.chatters.map(chatter => chatter.username).join(',')}`
    return (
        <Link to={`/chats/${chat.id}`} className="chat-menu__item">
          <div className="chat__icon">{Icons.MESSAGE}</div>
          <div className="chat__preview">{chatPreview}</div>
          <div className="chat__time">{chat.updatedAt}</div>
        </Link>
      );
}