import './App.scss'
import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import Lessons from './pages/Lessons/index';
import Group from './pages/Group/index'

function App() {

  return (
    <div className='wrapper'>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/groups" element={<Group />} />
      </Routes>
    </div>
    )
}

export default App
