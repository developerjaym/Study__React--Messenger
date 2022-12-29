import { Icons } from "../Extras/Icons";
import "./Search.css";

export default function Search({ label, onSearch }) {
  return (
    <form className="search" onSubmit={(e) => {
      e.preventDefault()
      console.log("hi")
      const formData = Object.fromEntries(new FormData(e.target));
      onSearch(formData);
    }}>
      <label>
        <span className="icon">{Icons.SEARCH}</span>
        <input name="term" type="search" placeholder={label} />
      </label>
    </form>
  );
}
