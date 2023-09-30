import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginRegisterTemplate from "./pages/LoginRegister/LoginRegisterTemplate";

function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterTemplate />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
