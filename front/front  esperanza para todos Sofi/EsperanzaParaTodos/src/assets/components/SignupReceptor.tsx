import React, { useState } from 'react'
import { Activity, Eye, EyeOff,  HeartHandshake } from 'lucide-react';
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
  
  const LoginPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
    if (!message) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg relative w-96">
          <button onClick={onClose} className="absolute top-2 right-2 text-white font-bold">
            &times;
          </button>
          <h3 className="text-xl font-semibold mb-2 text-white">Bienvenido</h3>
          <p>{message}</p>
        </div>
      </div>
    );
  };

export const SignupReceptor = () => {

    const [inputType, setInputType] = useState("password");

    const [errorMessage, setErrorMessage] = useState('');
    const [loginPopup, setLoginPopup] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [dateOfBirth, setDateOfBitrh] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
  
        e.preventDefault(); //prevents the default event which is reloading the oage when the form is submitted from happening
        
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('fullName:', fullName);
        console.log('dateOfBirth:', dateOfBirth);
    
        const url = "http://localhost:3000/clientes";
    
        try{
  
          const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body: JSON.stringify({email, password, fullName, phoneNumber, contactPerson, dateOfBirth, country}),
        }); 
             
                if(response.ok){
                    //alert("USUARIO LOGGEADO EXITOSAMENTE") //si la respuesta es correcta es usuario se logeo exitosamente
                    response.json().then((data) =>{
                      console.log(data)
                      localStorage.setItem("token", data.token)
  
                      const clienteId = data.id;
                      localStorage.setItem("clienteId", clienteId);
                      console.log(clienteId)
                      setLoginPopup(true);
                      
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

      const handleLoginPopupClose = () => {
        setLoginPopup(false);
        navigate("/PaginaReceptor");
      };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">

    <div className="absolute top-0 rigth-0 mt-12 mb-12 bg-blue-600 w-full h-18">

        <p className="mt-4 mb-4 text-white font-mono  text-xl font-bold text-center"> Si estas buscando ayuda registrate para hacer parte de los benfeciciados por nuestra organizacion</p>

    </div>

    <div className="absolute top-102 right-14">
    <HeartHandshake className="text-cyan-600" size={50}/>
      </div>

      <div className="absolute top-102 left-14">
    <HeartHandshake className="text-cyan-600" size={50}/>
      </div>

    <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-2/3 mt-40">
    <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Sign up</h2>
    <form onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="password">Password</label>
        <div className="flex flex-row mt-1">
        <input
          type={inputType}
          id="password"
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
       
       
       <button 
           type="button"
           className=" basis-1/6 bg-gray-200 rounded-full w-full mt-3 ml-4"
           onClick={ ()=>{
            if(inputType==="password"){
              setInputType("text");
            }else{
              setInputType("password");
            }
           }}
          
           >
            {inputType === 'password' ? (
               <Eye className="text-cyan-600" size={30}/>
            ): (<EyeOff className="text-cyan-600" size={30}/>)}
          </button>
          </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Nombre completo </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange = {(e) => setFullName(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Numero de celular</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange = {(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Persona de contacto</label>
        <input
          type="text"
          id="contactPerson"
          value={contactPerson}
          onChange = {(e) => setContactPerson(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="date">Fecha de nacimiento</label>
        <input
          type="date"
          id="dob"
          value={dateOfBirth}
          onChange = {(e) => setDateOfBitrh(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-500" htmlFor="text">Pais de residencia</label>
        <input
          type="text"
          id="country"
         value={country}
          onChange = {(e) => setCountry(e.target.value)}
          className="mt-1 block w-full p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <button 
         type="submit" 
         className="w-full py-2 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-900 transition duration-300 mt-4">
        Registrarse
      </button>
    </form>
  </div>
    
    {/* Render the ErrorPopup component if there is an error */}
   {errorMessage && (
    <ErrorPopup
        message={errorMessage}
        onClose={() => setErrorMessage('')}
    />
  )}

 {loginPopup && (
          <LoginPopup
            message="usuario logeado exitosamente!"
            onClose={handleLoginPopupClose}
          />
        )}

  </div>
  )
}
