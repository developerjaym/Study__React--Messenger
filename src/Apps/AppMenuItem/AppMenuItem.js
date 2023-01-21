import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import { toaster, ToastMoods } from "../../Extras/Toast/Toaster";
import { chatAppHttpClient } from "../../Extras/Utilities";
import "./AppMenuItem.css";

export default function AppMenuItem({ app, isInstalled }) {
  const navigate = useNavigate();
  const onDownload = async () => {
    await chatAppHttpClient.installAppForUser(app.id);
    toaster.createToast("Successfully downloaded!", ToastMoods.happy);
    navigate("/");
  };
  // TODO give user option to delete/uninstall apps they already have
  const onDelete = async () => {
    await chatAppHttpClient.deleteApp(app.id);
    toaster.createToast("App removed.", ToastMoods.happy);
    navigate("/");
  };
  return (
    <div className="card">
      <div className="card__header">
        {app.image ? (
          <img
            height="28"
            width="28"
            loading="lazy"
            className="card__icon"
            src={app.image}
            alt={`logo for ${app.name}`}
          />
        ) : (
          Icons.GAME
        )}
        <span className="card__title">{app.name}</span>
      </div>
      <div className="card__body">
        <p className="app__description">{app.description}</p>
      </div>
      <div className="card__footer">
        <Link
          to={`/apps/${app.id}`}
          className="button button--icon button--small"
        >
          {Icons.PLAY}
        </Link>
        {isInstalled ? (
          <button
            title="Delete this app from your device."
            className="button button--icon button--small"
            onClick={onDelete}
          >
            {Icons.DELETE}
          </button>
        ) : (
          <button
            title="Download this app to your device."
            className="button button--icon button--small"
            onClick={onDownload}
          >
            {Icons.DOWNLOAD}
          </button>
        )}
      </div>
    </div>
  );
}
