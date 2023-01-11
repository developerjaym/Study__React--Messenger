import { useParams } from "react-router-dom";
import { chatAppHttpClient } from "../../../Extras/Utilities";
import "./ChatInput.css";

export default function ChatInput() {
    const {id} = useParams()
    const onSubmit = e => {
        e.preventDefault()
        e.target.disabled = true;
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData); // it's an object!
        // e.target.reset()
        chatAppHttpClient.createMessage(id, formData, (response) => {
            console.log("message sent?", response)
            e.target.reset()
            e.target.disabled = false
        })
    }
  return (
    <form className="chat__form" onSubmit={onSubmit}>
      <label className="chat__label">
        <span>Compose</span>
        <input className="chat__input" name="content" required/>
      </label>
      <button type="submit" className="button button--icon">
        ✉
      </button>
    </form>
  );
}
