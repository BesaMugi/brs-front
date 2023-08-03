import './App.scss'
import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';

function App() {

  return (
    <div className='wrapper'>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
    )
}

export default App
