//import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginRegisterTemplate from "./pages/LoginRegister/LoginRegisterTemplate";
import UserTemplate from './pages/user/UserTemplate';
import { ToastContainer } from "react-toastify";

function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterTemplate />}/>
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
