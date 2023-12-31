//import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginRegisterTemplate from "./pages/LoginRegister/LoginRegisterTemplate";
import UserTemplate from './pages/user/UserTemplate';
import { ToastContainer } from "react-toastify";
import ActivateAccount from "./pages/LoginRegister/ActivateAccount";
import ChangePassword from "./pages/LoginRegister/ChangePassword";

function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterTemplate />}/>
          <Route path="/activate/:username" element={<ActivateAccount/>}/>
          <Route path="/change/:username" element={<ChangePassword/>}/>
          <Route path='/admin' element={<UserTemplate/>}/>
          <Route path='/owner' element={<UserTemplate/>}/>
          <Route path='/customer' element={<UserTemplate/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}

export default App
