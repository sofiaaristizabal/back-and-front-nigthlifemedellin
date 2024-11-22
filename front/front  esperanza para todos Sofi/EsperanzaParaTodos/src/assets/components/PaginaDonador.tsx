import React, { useState } from 'react'
import { Heart, HandHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg relative w-2/3">
        <button onClick={onClose} className="absolute top-2 right-2 text-white font-bold">
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

const OrganPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-cyan-800 text-white p-6 rounded-lg shadow-lg relative w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-white font-bold">
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-2 text-white">Gracias por su donacion</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};


export const PaginaDonador = () => {

    const [bloodType, setSelectedBloodType] = useState<string>("Seleccione una opcion");
    const [type, setType] = useState<string>("Sleccione una opcion");
    const [HLA, setHLA] = useState<string[]>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [organPopup, setOrganPopup] = useState(false);

    const [donorInformation, setDonorInformation] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [isGood, setIsGood] = useState('');

    const proveedorId = localStorage.getItem("proveedorId");

    const clearForm = () => {
      setSelectedBloodType("Seleccione una opcion");
      setType("Seleccione una opcion");
      setHLA([]);
      setDonorInformation('');
      setPrice('');
      setName('');
      setIsGood('');
  };
    

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
  
      e.preventDefault(); //prevents the default event which is reloading the oage when the form is submitted from happening
      
      console.log('name:', name);
      console.log('proveedorId:', proveedorId);
  
      const url = "http://localhost:3000/organos";
  
      try{

        const response = await fetch(url, {
          method: "POST",
          headers:{
              "Content-Type":"application/json" 
          },
          body: JSON.stringify({type, donorInformation, bloodType, name, price, HLA, isGood, proveedorId}),
      }); 
           
              if(response.ok){
                  //alert("USUARIO LOGGEADO EXITOSAMENTE") //si la respuesta es correcta es usuario se logeo exitosamente
                  response.json().then((data) =>{
                    console.log(data)
                    //localStorage.setItem("token", data.token);
                    setOrganPopup(true);
                    clearForm();
                    
                  })
                }else {

                   const errorData = await response.json();
                   console.log(errorData);
                   const error=errorData.message==="credenciales invalidas"?"Invalid credentials":errorData.message
                   throw new Error(error || "Ocurrio un error intentando loggear");
                }
              
      }catch(error){
        if (error instanceof Error) {
          setErrorMessage(error.message); // Set the error message from the caught Error
      } else {
          setErrorMessage("An unknown error occurred"); // Fallback if it's not an Error instance
      }
      }
      
    
    };
   

    const [isOpen, setIsOpen] = useState(false);
    const [isTOpen, setIsTOpen] = useState(false);
    

    const options = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const types = ['organo duro','tejido blando', 'tejido duro' ];

    const handleSelectedTypes = (tipo: React.SetStateAction<string>) => {
        setType(tipo);
        setIsTOpen(false);
    };

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedBloodType(option);
        setIsOpen(false);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setHLA((prev) =>
          e.target.checked ? [...prev, value] : prev.filter((HLA) => HLA !== value)
        );
      };

      const handleLoginPopupClose = () => {
        setOrganPopup(false);
      };
  
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
   
   <header className="bg-blue-50 shadow-sm py-4 px-6">

   <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Heart className="text-blue-600" size={40} />
            <h1 className="text-2xl font-bold text-blue-800">Esperanza Para Todos</h1>
          </div>

           <button className="border-2 border-blue-500 bg-transparent hover:bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
            Perfil
           </button>

        </nav>

   </header>

   <div className="container mx-auto py-16 flex justify-center gap-4 items-center">
    <HandHeart className="text-cyan-400"/>
   <h1 className="text-2xl font-bold text-cyan-600 text-center">Hoy por ti, mañana por mi</h1>
   <HandHeart className="text-cyan-400"/>
   </div>
    
   <div className="flex justify-center items-center">
    <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-10/12">
    
    <h2 className="text-2xl font-bold text-blue-800 text-center">Agrega una donacion</h2>
    
    <form onSubmit={handleSubmit}
    >
    <div className="grid grid-cols-2 gap-10">

    <div className="space-y-4 mt-6">
    <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Nombre</label>
        <input
          type="textl"
          id="name"
          value={name}
          onChange = {(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="email">categoria</label>
        <div 
            className="relative w-full"
            onBlur={() => setIsTOpen(false)}
        >
            <div 
                className="bg-white p-2 border cursor-pointer mt-2"
                onClick={() => setIsTOpen(!isOpen)}
            > {type}
            </div>
            {isTOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border z-10">
                    {types.map((type, index) => (
                        <div 
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectedTypes(type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="date">Hasta que fecha sirve</label>
        <input
          type="date"
          id="isGood"
          value={isGood}
          onChange = {(e) => setIsGood(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Aporte economico requerido</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange = {(e) => setPrice(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

    </div>

    <div className="space-y-4 mt-6">
    <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="email">Tipo de sangre</label>
        <div 
            className="relative w-full"
            onBlur={() => setIsOpen(false)}
        >
            <div 
                className="bg-white p-2 border cursor-pointer mt-2"
                onClick={() => setIsOpen(!isOpen)}
            > { bloodType}
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border z-10">
                    {options.map((option, index) => (
                        <div 
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="email">HLA</label>
      <div className="flex flex-col space-y-2">
        {["HLA-A", "HLA-B", "HLA-C", "HLA-DR", "HLA-DP", "HLA-DQ"].map((HLA) => (
          <label key={HLA} className="flex items-center">
            <input
              type="checkbox"
              value={HLA}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            {HLA}
          </label>
        ))}
      </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Informacion del donante</label>
        <input
          type="text"
          id="donorInformation"
          value={donorInformation}
          onChange = {(e) => setDonorInformation(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>
     
    </div>
    </div>

    <button 
      type="submit"
      className="border-2 border-blue-500 bg-transparent hover:bg-blue-100 text-blue-500 px-4 py-2 rounded-lg ">
            Hacer donacion
           </button>
    </form>

    </div>
   </div>
   
   {/* Render the ErrorPopup component if there is an error */}
   {errorMessage && (
    <ErrorPopup
        message={errorMessage}
        onClose={() => setErrorMessage('')}
    />
  )}

 {organPopup && (
          <OrganPopup
            message="acabas de ayudar a salvar una vida"
            onClose={handleLoginPopupClose}
          />
        )}


    </div>
  )
}
