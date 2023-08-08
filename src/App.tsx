import "./App.scss";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Lessons from "./pages/Lessons/index";
import Group from "./pages/Group/index";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  return !token ? (
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/users" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/groups" element={<Group />} />
      </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/users" element={<Home />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/groups" element={<Group />} />
    </Routes>
  );
}

export default App;
