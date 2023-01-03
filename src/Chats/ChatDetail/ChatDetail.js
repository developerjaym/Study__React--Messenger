import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../Page/Page";
import "./ChatDetail.css";

export default function ChatDetail() {
  const messagesEndRef = useRef(null);
  
  const chat = useLoaderData();
 
  const messageElements = chat.messages.map((message) => (
    <div className="message" key={message.id} id={`chat-message-${message.id}`} ref={messagesEndRef}>
      {message.content}
    </div>
  ));
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }, [chat])
  return (
    <Page pageTitle={chat.users.map((user) => user.username).join(", ")}>
      <div className="chat">
        <div className="chat__message-list">{messageElements}</div>
      </div>
      <form className="chat__form">
        <label className="chat__label">
          <span>Compose</span>
          <input className="chat__input" />
        </label>
        <button type="submit" className="button button--icon">
          ✉
        </button>
      </form>
    </Page>
  );
}
