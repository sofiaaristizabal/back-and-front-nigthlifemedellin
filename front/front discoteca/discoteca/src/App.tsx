import { useState } from 'react'
import './App.css'
import { Start } from './components/start'
import { Login } from './components/login'
import { Signin } from './components/signin'
import { SignupEmpresa } from './components/signupEmpresa'
import { EditarPerfilUsuario } from './components/editarPerfilUsuario'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginEmpresa } from './components/loginEmpresa'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
    <div>
     <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginEmpresa" element={<LoginEmpresa />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signUpEmpresa" element={<SignupEmpresa/>} />
        <Route path="/editarPerfilUsuario" element={<EditarPerfilUsuario />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
