import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface eventPopupProps{
  message: string;
  onClose: () => void;
}

const EventPopup: React.FC<eventPopupProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg relative w-80">
        <button onClick={onClose} className="absolute top-2 right-2 text-white font-bold">
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Evento creado exitosamente</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export const AddEvent = () => {

    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [cover, setCover] = useState('');

    const [eventPopup, setEventPopup] = useState(false);

    const discotecaId = localStorage.getItem("empresaId");


    const navigate = useNavigate(); 

    const handleSubmit = (e: { preventDefault: () => void; }) => {
  
        e.preventDefault(); //prevents the default event which is reloading the oage when the form is submitted from happening
    
        const url = "https://back-and-front-nigthlifemedellin.onrender.com/eventos";
    
        fetch(url, {
            method: "POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body: JSON.stringify({nombre, fecha, hora, cover, discotecaId}),
        }).then(
            (res) => {
             
                if(res.ok){
                    //alert("evento agregado exitosamente") //si la respuesta es correcta es usuario se logeo exitosamente
                    res.json().then((data) =>{
                      console.log(data)
                    })

                    setEventPopup(true);
                  }else {
                     alert("Evento no puedo ser agregado")
                     
                     console.log(discotecaId)
                  }
                
            }
        )
      };

      const profile = () =>{
        navigate('/editarPerfilUsuario');
      }
  

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-900">
     
     <div className="mt-12 border-4 rounded-lg border-white-500/100">
     <h1 
     className="mr-6 ml-6 mt-2 mb-2 text-indigo-500 font-mono text-center font-bold shadow-lg text-4xl"
     > Agregar evento
     </h1>
     </div>

     <div className="mt-14 grid grid-cols-2 gap-4 w-full place-items-center"> 

     <div className="ml-14 p-8 w-full border-4 rounded-lg border-white-500/100">
     <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-indigo-300 mb-4" htmlFor="text">Nombre del evento</label>
        <input
          type="text"
          id="nombreEvento"
          value={nombre}
          onChange = {(e) => setNombre(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-indigo-300 mb-4" htmlFor="date">fecha</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange = {(e) => setFecha(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-indigo-300 mb-4" htmlFor="text">Hora de inicio</label>
        <input
          type="text"
          id="hora"
          value={hora}
          onChange = {(e) => setHora(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-medium font-mono text-indigo-300 mb-4" htmlFor="text">Cover</label>
        <input
          type="text"
          id="cover"
          value={cover}
          onChange = {(e) => setCover(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

     </div>

     <div className='flex flex-col'>
     <button 
        className="mt-56 px-6 py-8 bg-lime-600 text-white text-bold font-mono text-3xl rounded-lg hover:bg-lime-900 transition"
        onClick = {handleSubmit}  
        >
          Agregar evento
        </button>
        <button 
        className="mt-14 px-4 py-4 bg-white text-indigo-700 text-bold font-mono text-xl rounded-lg hover:bg-gray-400 transition"
        onClick = {profile}  
        >
          Editar pefil de empresa
        </button>
     </div>

     </div>
     
     {eventPopup && (
          <EventPopup
            message={nombre}
            onClose={()=>setEventPopup(false)}
          />
        )}

    </div>
  )
}
