import { useLoaderData, useNavigate } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import { toaster, ToastMoods } from "../../Extras/Toast/Toaster";
import { chatAppHttpClient } from "../../Extras/Utilities";
import Page from "../../Page/Page";
import "./FriendDetail.css";

export default function FriendDetail() {
  const friend = useLoaderData();
  const navigate = useNavigate();
  const onMessageFriend = async (e) => {
    const chatsWithOtherUser = await chatAppHttpClient.getAllUsersChats(friend.username);
    const chatWithTheseTwoOnly = chatsWithOtherUser.reduce((pre, cur) => {
      if(cur.chatters.map(chatter => chatter.username).length > 2) {
        return pre;
      }
      return cur;
    }, null);

    if(chatWithTheseTwoOnly) {
      navigate(`/chats/${chatWithTheseTwoOnly.id}`)
    }
    else {
      chatAppHttpClient.createChat([friend.username], (response) => {
        navigate(`/chats/${response.id}`)
      })
    }
    //createChat
   
  }
  const onDeleteFriend = async (e) => {
    // TODO call back end and delete friend
    // THEN toast
    // THEN navigate to friends list
    const response = await chatAppHttpClient.deleteFriend(friend.username)
    toaster.createToast('Friend deleted', ToastMoods.happy)
    navigate("/friends")
  }
  return (
    <Page pageTitle={friend.username} backRoute="/friends">
      <div className="friend-detail">
        <div className="friend-detail__icon">
          {friend.username[0].toUpperCase()}
        </div>
        <div className="friend-detail__name">{friend.username}</div>

        <menu className="friend__menu">
          <div className="friend__menu-option" onClick={onMessageFriend}>
            <div className="option__icon">{Icons.MESSAGE}</div>
            <div className="option__label">Chat</div>
          </div>
          <div className="friend__menu-option" >
            <div className="option__icon">{Icons.EDIT}</div>
            <div className="option__label">Edit</div>
          </div>
          <div className="friend__menu-option" onClick={onDeleteFriend}>
            <div className="option__icon">{Icons.DELETE}</div>
            <div className="option__label">Delete</div>
          </div>
        </menu>
      </div>
    </Page>
  );
}
