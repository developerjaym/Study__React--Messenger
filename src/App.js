import { Outlet } from "react-router-dom";
import "./App.css";
import Toast from "./Extras/Toast/Toast";


function App() {
  return (
    <div className="screen">
      <Toast/>
      <Outlet/>
    </div>
  );
}

export default App;
