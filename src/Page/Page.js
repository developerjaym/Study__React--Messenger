import { useNavigate } from "react-router-dom";
import Clock from "../Clock/Clock";
import { Icons } from "../Extras/Icons";
import "./Page.css";

export default function Page({ pageTitle, children, transparent }) {
  const navigate = useNavigate();
  return (
    <div className={`page ${transparent ? "page--transparent" : "slide-in"}`}>
      {pageTitle ? (
        <div className="page__header">
          <button className="header__back-button" onClick={() => navigate(-1)}>
            {Icons.BACK}
          </button>
          <h2 className="header__title">{pageTitle}</h2>
        </div>
      ) : <div className="page__header page__header--transparent">
        <Clock/>
          {/* <h2 className="header__title">Fri, Dec 23</h2> */}
        </div>}
      <div className="page__body">{children}</div>
    </div>
  );
}
