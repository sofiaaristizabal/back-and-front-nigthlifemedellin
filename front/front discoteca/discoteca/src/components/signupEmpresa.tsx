'use client'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupEmpresa = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');

    const [inputType, setInputType] = useState("password");

    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
  
      e.preventDefault();
  
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('direccion:', direccion);
      console.log('nombre completo:', setFullName);
      console.log('celular:', phoneNumber);
      console.log('foto url:', profileImage);
      console.log('laittud:', latitud);
      console.log('longitud:', longitud);
      
  
      const url = "https://back-and-front-nigthlifemedellin.onrender.com/discotecas";
  
      fetch(url, {
       
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
  
          body: JSON.stringify({email, password, direccion, fullName, phoneNumber, profileImage, latitud, longitud})
      }).then((res)=>{
        
          if(res.ok){
              alert("USUARIO CREADO EXITOSAMENTE")
              res.json().then((data) =>{
                console.log(data)
                localStorage.setItem("token", data.token)

                const empresaId = data.id;
                localStorage.setItem("empresaId", empresaId);
                  
                navigate('/loginEmpresa');
              })
            }else {
               alert("FALLA A LA HORA DE CREAR USUARIO")
            }
          
      })
    }
  
    
  
  
    return (
      
      <div className="flex flex-col items-center justify-center min-h-full bg-gray-900">
  
  
      <div className="bg-gray-800 p-14 rounded-lg shadow-lg w-3/5 h-full">
      <h2 className="text-2xl font-bold mb-6 text-rigth- text-violet-300">Sign up</h2>
      <form onSubmit={handleSubmit} className="flex-col ">

  
        <div className="mb-4">
          <label className="block text-sm font-medium text-violet-400" htmlFor="nombreCompleto">Nombre de la discoteca</label>
          <input
            type="text"
            id="nombreCompleto"
            value={fullName}
            onChange ={(e) => setFullName(e.target.value)}
            className=" w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>
  
        <div className="mb-4">
              <label htmlFor="direccion" className="block text-violet-400 text-sm font-medium mb-2">Direccion</label>
              <input 
              type="text" 
              id="direccion" 
              name="direccion" 
              value={direccion}
              onChange ={(e) => setDireccion(e.target.value)}
              className="w-3/5 border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200" required/>
          </div>

          <div className="mb-4">
          <label className="block text-sm font-medium text-violet-400" htmlFor="latitud">latitud</label>
          <input
            type="text"
            id="profileImage"
            value={latitud}
            onChange ={(e) => setLatitud(e.target.value)}
            className=" w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-violet-400" htmlFor="longitud">longitud</label>
          <input
            type="text"
            id="profileImage"
            value={longitud}
            onChange ={(e) => setLongitud(e.target.value)}
            className=" w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-violet-400" htmlFor="celular">celular</label>
        <input
          type="text"
          id="celular"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

  
        <div className="mb-4">
          <label className="block text-sm font-medium text-violet-400" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>
  
  
        <div className="mb-4">
          <label className="block text-sm font-medium text-violet-400" htmlFor="password">Contraseña</label>
          <div className="flex flex-row mt-1">
          <input
            type={inputType}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

           <button 
           type="button"
           className=" basis-1/6 bg-gray-800 rounded-full w-full mt-3 ml-4"
           onClick={ ()=>{
            if(inputType==="password"){
              setInputType("text");
            }else{
              setInputType("password");
            }
           }}
          
           >
            {inputType === 'password' ? (
                <img
                src = "/eye.png"
                alt = "show password"
                className = "rounded-full w-8 h-8 text-white"
                ></img>
            ): (<img
                src = "/eye-off.png"
                alt = "hide password"
                className = "rounded-full w-8 h-8"
                ></img>)}
          </button>
         </div>
          
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-violet-400" htmlFor="imagen">URL imagen de perfil</label>
          <input
            type="text"
            id="profileImage"
            value={profileImage}
            onChange ={(e) => setProfileImage(e.target.value)}
            className=" w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <button 
         type="submit"
         className="w-3/5 mt-8 w-full py-2 bg-violet-500 text-white rounded-md hover:bg-violet-900 transition duration-300">
          Sign up
        </button>
      </form>
    </div>
      
  
  
  </div>
    )
}
