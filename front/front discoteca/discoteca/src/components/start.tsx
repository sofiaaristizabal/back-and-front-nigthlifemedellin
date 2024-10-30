import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Start = () => {

  const navigate = useNavigate();

  const navigateUsuario = ()=>{
    navigate("/login");
  }

  const navigateEmpresa = ()=>{
    navigate("/loginEmpresa");
  }


  return (
    <div className="bg-black min-h-screen w-full p-4">
         
         <div className="flex justify-center mt-48">
            <button className="
                relative w-4/5 h-64 
                rounded-3xl border-4 border-violet-500  
                transition-all duration-300 ease-in-out 
                hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.7)] 
                hover:scale-105 
                hover:-translate-y-1"
                onClick={navigateUsuario}
                >
                <div className="
                flex-col relative z-10 
                text-white font-mono text-center font-bold 
                shadow-lg text-4xl 
                flex items-center justify-center h-full">
                INGRESA PARA ENCONTRAR LOS
                <span className="text-9xl text-purple-700 text-center">EVENTOS</span>
                DE HOY
                </div>
            </button>
            </div>
        
            <div className="flex justify-center mt-14">
            <button className="
                relative w-2/5 h-14 
                rounded-full border-4 border-lime-300  
                transition-all duration-300 ease-in-out 
                hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.7)] 
                hover:scale-105 
                hover:-translate-y-1"
                onClick={navigateEmpresa}
                >
            <div className="
                flex-col relative z-10 
                text-white font-mono text-center font-bold 
                shadow-lg text-xl 
                flex items-center justify-center h-full">
             Ingresa de empresas 
            </div>
            </button>
            </div>

    </div>

  )
}
