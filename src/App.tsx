import "./App.scss";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Lessons from "./pages/Lessons/index";
import Group from "./pages/Group/index";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  return !token ? (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/groups" element={<Group />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
