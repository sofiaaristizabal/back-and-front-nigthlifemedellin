'use client'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoDeDocumento, setTipoDeDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate(); 
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {

    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('tipoDeDocumento:', tipoDeDocumento);
    console.log('documento:', documento);
    console.log('dateOfBirth:', dateOfBirth);
    console.log('fullName:', fullName);
    console.log('phoneNumber:', phoneNumber);
    
    


    const url = "http://localhost:3000/consumidores";

    fetch(url, {
     
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },

        body: JSON.stringify({email, password, tipoDeDocumento, documento, dateOfBirth, fullName, phoneNumber})
    }).then((res)=>{
      
        if(res.ok){
            alert("USUARIO CREADO EXITOSAMENTE")
            res.json().then((data) =>{
              console.log(data)
              localStorage.setItem("token", data.token)
              
              const consumidorId = data.id;
              localStorage.setItem("consumidorId", consumidorId);
              console.log(consumidorId)

              navigate('/login')
            })
          }else {
             alert("FALLA A LA HORA DE CREAR USUARIO")
          }
        
    })
  }

  


  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">


    <div className="bg-gray-800 p-14 rounded-lg shadow-lg w-3/5 h-full">
    <h2 className="text-2xl font-bold mb-6 text-rigth- text-lime-500">Sign up</h2>
    <form onSubmit={handleSubmit} className="flex-col ">

    <div className="mb-4">
        <label htmlFor= "options" className="block text-sm font-medium text-lime-600">Tipo de documento</label>
        <select 
        id="tipoDeDocumento" 
        className="mt-4 bg-gray-700 text-white rounded-lg border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        value = {tipoDeDocumento}
        onChange={(e) => setTipoDeDocumento(e.target.value)}
        >
            <option value="" disabled selected>Seleccione una opcion</option>
            <option value="cedula de ciudadania">Cedula de ciudadania</option>
            <option value="cedula de extranjeria">Cedula de extranjeria</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-lime-600" >Documento de identidad</label>
        <input
          type="text"
          id="documento"
          value={documento}
          onChange ={(e) => setDocumento(e.target.value)}
          className=" w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
            <label htmlFor="dob" className="block text-lime-600 text-sm font-bold mb-2">Date of Birth</label>
            <input 
            type="date" 
            id="dob" 
            name="dob" 
            value={dateOfBirth}
            onChange ={(e) => setDateOfBirth(e.target.value)}
            className="w-3/5 border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200" required/>
        </div>

        <div className="mb-4">
        <label className="block text-sm font-medium text-lime-600" >Nombre completo</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-lime-600" >celular</label>
        <input
          type="text"
          id="phoneNumbet"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-3/5 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-lime-600" htmlFor="email">Email</label>
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
        <label className="block text-sm font-medium text-lime-600" htmlFor="password">Contraseña</label>
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


      <button 
       type="submit"
       className="w-3/5 mt-8 w-full py-2 bg-lime-600 text-white rounded-md hover:bg-lime-900 transition duration-300">
        Sign up
      </button>
    </form>
  </div>
    


</div>
  )
}
