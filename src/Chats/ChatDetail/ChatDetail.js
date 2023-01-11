import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ChatPoller, Utilities } from "../../Extras/Utilities";
import Page from "../../Page/Page";
import "./ChatDetail.css";
import ChatInput from "./ChatInput/ChatInput";

export default function ChatDetail() {
  const messagesEndRef = useRef(null);

  const chat = useLoaderData();

  const me = Utilities.user;

  const [messages, setMessages] = useState([])

  useEffect(() => {
    return ChatPoller.subscribe(chat.id, (newMessages) => {
      console.log("new messages?", JSON.stringify(newMessages, null, 2));
      setMessages(m => [...m, ...newMessages])
    });
  }, [chat.id]);

  // TODO, I need a timer to poll for new messages
  // TODO, I need an endpoint that will pull messages after a certain message

  const messageElements = messages.map((message) => (
    <div
      className={`message message--${me === message.author.username ? 'mine' : 'other'}`}
      key={message.id}
      id={`chat-message-${message.id}`}
      ref={messagesEndRef}
    >
      {message.content}
    </div>
  ));
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  });
  return (
    <Page
      pageTitle={chat.chatters.map((chatter) => chatter.username).join(", ")}
      backRoute="/chats"
    >
      <div className="chat">
        <div className="chat__message-list">{messageElements}</div>
      </div>
      <ChatInput />
    </Page>
  );
}
