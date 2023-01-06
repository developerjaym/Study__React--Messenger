import { useNavigate } from "react-router-dom";
import { Icons } from "../Extras/Icons";
import { toaster, ToastMoods } from "../Extras/Toast/Toaster";
import Page from "../Page/Page";
import Search from "../Search/Search";
import ChatMenuItem from "./ChatMenuItem/ChatMenuItem";
import "./Chats.css";

export default function Chats() {
  const navigate = useNavigate()
  const data = [
    {
      id: 1,
      updatedAt: "2022-12-22",
      preview: {
        user: {
          id: 1,
          username: "bananna"
        },
        content: "hello, world"
      },
      users: [
        {
          id: 1,
          username: "bananna",
        },
        {
          id: 2,
          username: "bballmike",
        },
      ],
    },
    {
      id: 2,
      updatedAt: "2022-12-23",
      preview: {
        user: {
          id: 1,
          username: "bananna"
        },
        content: "hello, world"
      },
      users: [
        {
          id: 1,
          username: "bananna",
        },
        {
          id: 2,
          username: "bballmike",
        },
      ],
    },
  ];
  const chatMenuList = data.map((chat) => (
    <ChatMenuItem key={chat.id} chat={chat} />
  ));
  return (
    <Page pageTitle="Conversations" backRoute="/">
      <Search label="Search messages" onSearch={() => {}} />
      <div className="chats__list">
        <button
          className="chats__option"
          onClick={() => {
            navigate("/chats/create")
            toaster.createToast("Chat Added", ToastMoods.happy);
          }}
        >
          +Start new chat
        </button>
        {chatMenuList}
      </div>
    </Page>
  );
}
