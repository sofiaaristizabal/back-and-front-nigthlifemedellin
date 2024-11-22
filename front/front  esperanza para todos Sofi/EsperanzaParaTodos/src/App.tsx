import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { EsperanzaParaTodos } from './assets/components/EsperanzaParaTodos'
import { LoginDonador } from './assets/components/LoginDonador'
import { LoginReceptor } from './assets/components/LoginReceptor'
import { SignupDonador } from './assets/components/SignupDonador'
import { SignupReceptor } from './assets/components/SignupReceptor'
import { PaginaDonador } from './assets/components/PaginaDonador'
import { PaginaReceptor } from './assets/components/PaginaReceptor'
import './App.css'

function App() {
  

  return (
    
    <Router>
    <div>
     <Routes>
        <Route path="/" element={<EsperanzaParaTodos/>} />
        <Route path="/LoginDonador" element={<LoginDonador/>} />
        <Route path="/LoginReceptor" element={<LoginReceptor/>} />
        <Route path="/SignupDonador" element={<SignupDonador/>} />
        <Route path="/SignupReceptor" element={<SignupReceptor/>} />
        <Route path="/PaginaDonador" element={<PaginaDonador/>} />
        <Route path="/PaginaReceptor" element={<PaginaReceptor/>} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
