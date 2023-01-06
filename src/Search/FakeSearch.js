import { useNavigate } from "react-router-dom";
import { Icons } from "../Extras/Icons";
import "./Search.css";

export default function FakeSearch({ label }) {
  const navigate = useNavigate()
  return (
    <form className="search" onSubmit={(e) => {
      e.preventDefault()
    }} onFocus={e => navigate("/search")}>
      <label>
        <span className="icon">{Icons.SEARCH}</span>
        <input name="term" type="search" placeholder={label}/>
      </label>
    </form>
  );
}
