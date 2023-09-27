import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
