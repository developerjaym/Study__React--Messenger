import logo from "./logo.svg";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Toast from "./Extras/Toast/Toast";


function App() {
  console.log('app');
  return (
    <div className="screen">
      <Toast/>
      <Outlet/>
    </div>
  );
}

export default App;
