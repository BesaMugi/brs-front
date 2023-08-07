import "./App.scss";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Lessons from "./pages/Lessons/index";
import Group from "./pages/Group/index";
import Brs from "./pages/JournalActive/index";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Journal from "./pages/JournalPresent";

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  return !token ? (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/groups" element={<Group />} />
      </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/groups" element={<Group />} />
      <Route path="/brs" element={<Brs />} />
      <Route path="/journal" element={<Journal />} />

    </Routes>
  );
}

export default App;
