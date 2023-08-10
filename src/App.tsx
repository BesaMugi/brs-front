import "./App.scss";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Lessons from "./pages/Lessons/index";
import Group from "./pages/Group/index";
import Brs from "./pages/JournalActive";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import GroupList from "./pages/Group/GroupList";
import HomeMain from "./components/Main/HomeMain";
import Journal from "./pages/JournalPresent";
import SubjectJournal from "./pages/JournalPresent/SubjectJournal";

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  return !token ? (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/group/:id" element={<Navigate to="/login" />} />
      <Route path="/users" element={<Navigate to="/login" />} />
      <Route path="/lessons" element={<Navigate to="/login" />} />
      <Route path="/groups" element={<Navigate to="/login" />} />
      <Route path="/brs" element={<Navigate to="/login" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<HomeMain />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/users" element={<Home />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/groups" element={<Group />} />
      <Route path="/group/:id" element={<GroupList />} />
      <Route path="/journal" element={<Journal />} />
      <Route
        path="/groups/:groupId/subjects/:subjectId"
        element={<SubjectJournal />}
      />
    </Routes>
  );
}

export default App;
