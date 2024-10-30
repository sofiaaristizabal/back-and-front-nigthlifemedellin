import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';

export const EditarPerfilUsuario = () => {

  const [profileImage, setProfileImage] = useState('/usuario.jpg'); 
  const [descripcion, setDescripcion] = useState('');
  const [horarios, setHorarios] = useState('');
  const [contacto, setContacto] = useState('');
  const [redSocial, setRedSocial] = useState('');

   useEffect(() => {
    
     const fetchProfileImage = async () => {
    
      const url = "http://localhost:3000/discotecas";

      try {

        const response = await fetch (url);

        if(response.ok){
          const data = await response.json();

          setProfileImage(data.profileImage || 'usuario.jpg');

        } else {
          console.log("Falla a la hora de obtener la imagen de perfil")
        }
      } catch (error){
        console.error("Error a la hora de obetener la foto de perfil", error)
      }

     };

     fetchProfileImage();

   }, []);

  const changeProfliePicture = (e: {preventDefault: () => void;}) =>{
   e.preventDefault();

   const url = "http://localhost:3000/discotecas";

   fetch(url, {
    method:"PATCH",
    headers:{
      "Content-Type": "application/json"
  },  

   body: JSON.stringify({profileImage})
    
  } ).then((res)=>{

    if(res.ok){
      alert("FOTO DE PERFIL MODIFICADA EXITOSAMENTE")
      res.json().then((data) =>{
        console.log(data)
        localStorage.setItem("token", data.token)
      })
    } else {
      alert("FALLA A LA HORA DE MODIFICAR FOTO DE PERFIL")
    }

  })

  }

  const handleSubmit = (e: { preventDefault: () => void; }) =>{

    e.preventDefault();

    const url = "http://localhost:3000/discotecas";
  
    fetch(url, {
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
    },  

     body: JSON.stringify({ descripcion, horarios, contacto, redSocial})
      
    } ).then((res)=>{

      if(res.ok){
        alert("USUARIO MODIFICADO EXITOSAMENTE")
        res.json().then((data) =>{
          console.log(data)
          localStorage.setItem("token", data.token)
        })
      } else {
        alert("FALLA A LA HORA DE MODIFICAR USUARIO")
      }

    })
  
  
  }


  return (

    <div className="flex flex-col items-center justify-center  min-h-full bg-gray-900">
     
     <div className="mt-8 flex flex-col justify-center mb-6">
        <img 
          src={profileImage}
          alt="profile" 
          className="w-60 h-60 rounded-full border-4 border-green-300 object-cover"
        />

        <button className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-800 transition">
          Change profile picture 
        </button>
      </div>

     
      <div className=" p-8 rounded-lg shadow-lg w-4/5 h-full">

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-gray-300 mb-4" htmlFor="text">Descripcion</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange = {(e) => setDescripcion(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-gray-300 mb-4" htmlFor="text">Horarios</label>
        <input
          type="text"
          id="horarios"
          value={horarios}
          onChange = {(e) => setHorarios(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-gray-300 mb-4" htmlFor="text">Nombre persona de contacto</label>
        <input
          type="text"
          id="contacto"
          value={contacto}
          onChange = {(e) => setContacto(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-gray-300 mb-4" htmlFor="password">Link redes sociales</label>
        <input
          type="text"
          id="redSocial"
          value={redSocial}
          onChange = {(e) => setRedSocial(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>
      
      <div className=" flex justify-center items-center h-full">
      <button
       className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-800 transition"
       onClick={handleSubmit}
        >
          Update profile 
        </button>
        </div>


      </div>

    </div>
  )
}
