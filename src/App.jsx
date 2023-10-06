//import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginRegisterTemplate from "./pages/LoginRegister/LoginRegisterTemplate";
import AdminTemplate from './pages/admin/AdminTemplate';

function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterTemplate />}/>
          <Route path='/admin' element={<AdminTemplate userRole='admin'/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
