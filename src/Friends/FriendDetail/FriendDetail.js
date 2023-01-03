import { useLoaderData, useNavigate } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import { toaster, ToastMoods } from "../../Extras/Toast/Toaster";
import Page from "../../Page/Page";
import "./FriendDetail.css";

export default function FriendDetail() {
  const friend = useLoaderData();
  const navigate = useNavigate();
  const onMessageFriend = (e) => {
    // TODO
    // ?PUT? a new conversation between current user and friend
    // After that conversation's ID is returned from the back end,
    //   then navigate to that chat
    const pretendId = 1
    navigate(`/chats/${pretendId}`)
  }
  const onDeleteFriend = (e) => {
    // TODO call back end and delete friend
    // THEN navigate to friends list
    // THEN toast
    navigate("/friends")
    toaster.createToast('Friend deleted', ToastMoods.happy)
  }
  return (
    <Page pageTitle={friend.username}>
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
