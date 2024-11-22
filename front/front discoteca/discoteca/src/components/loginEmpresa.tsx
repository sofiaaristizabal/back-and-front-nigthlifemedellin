'use client'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg relative w-80">
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
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg relative w-80">
        <button onClick={onClose} className="absolute top-2 right-2 text-white font-bold">
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Bienvenido</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export const LoginEmpresa = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [inputType, setInputType] = useState("password");

    const[errorMessage, setErrorMessage] = useState('');
    const [loginPopup, setLoginPopup] = useState(false);

    const navigate = useNavigate();
  
    const handleSubmit = async(e: { preventDefault: () => void; }) => {
  
      e.preventDefault(); //prevents the default event which is reloading the oage when the form is submitted from happening
      
      console.log('Email:', email);
      console.log('Password:', password);
  
      const url = "http://localhost:3000/discotecas/login";
      const body = JSON.stringify({email, password}); //converts email and password from a JSON to a string
  
      try{

        const response = await fetch(url, {
          method: "POST",
          headers:{
              "Content-Type":"application/json" 
          },
          body: JSON.stringify({email, password}),
      });
           
              if(response.ok){
                  //alert("USUARIO LOGGEADO EXITOSAMENTE") //si la respuesta es correcta es usuario se logeo exitosamente
                  response.json().then((data) =>{
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    
                    const empresaId = data.discoetca.id;
                    console.log('id de data', data.discoetca.id);
                    localStorage.setItem("empresaId", empresaId);
                    
                    //navigate('/addEvent');
                    //navigate('/addEvent');
                    setLoginPopup(true);
                    
                  })
                }else {
                   //alert("mal")
                   const errorData = await response.json();
                   console.log(errorData);
                   const error=errorData.message==="credenciales invalidas"?"Invalid credentials":errorData.message
                   throw new Error(error || "Ocurrio un error intentando loggear");
                }
              
          } catch(error){
        if (error instanceof Error) {
          setErrorMessage(error.message); // Set the error message from the caught Error
      } else {
          setErrorMessage("An unknown error occurred"); // Fallback if it's not an Error instance
      }

      }
     
    };

    const navigateSignUp = () =>{
      navigate("/signUpEmpresa")
    }

    const handleLoginPopupClose = () => {
      setLoginPopup(false);
      navigate("/addEvent");
    };


  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">


    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-6 text-center text-white">Login de empresas</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
        <div className="flex flex-row mt-1">
        <input
          type={inputType}
          id="password"
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
          className="basis-5/6 mt-1 block w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
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
         className="w-full py-2 bg-violet-600 text-white rounded-md hover:bg-violet-900 transition duration-300 mt-4">
        Login
      </button>
    </form>
  </div>
    
  <div className=" mt-14 bg-gray-800 p-8 rounded-lg shadow-lg w-96">
    
    <p  className="block text-sm font-medium text-gray-300">No tienes una cuenta todavia?</p>
    <button 
    className="mt-6 w-full py-2 bg-lime-500 text-white rounded-md hover:bg-lime-800 transition duration-300"
    onClick={navigateSignUp}
    >
        Sign up
      </button>

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
