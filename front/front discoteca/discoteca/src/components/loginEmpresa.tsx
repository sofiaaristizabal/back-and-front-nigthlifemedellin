'use client'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginEmpresa = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [inputType, setInputType] = useState("password");

    const navigate = useNavigate();
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
  
      e.preventDefault(); //prevents the default event which is reloading the oage when the form is submitted from happening
      
      console.log('Email:', email);
      console.log('Password:', password);
  
      const url = "http://localhost:3000/discotecas/login";
      const body = JSON.stringify({email, password}); //converts email and password from a JSON to a string
  
      fetch(url, {
          method: "POST",
          headers:{
              "Content-Type":"application/json" 
          },
          body: JSON.stringify({email, password}),
      }).then(
          (res) => {
           
              if(res.ok){
                  alert("USUARIO LOGGEADO EXITOSAMENTE") //si la respuesta es correcta es usuario se logeo exitosamente
                  res.json().then((data) =>{
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    
                  })
                }else {
                   alert("mal")
                }
              
          }
      )
    };

    const navigateSignUp = () =>{
      navigate("/signUpEmpresa")
    }


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


</div>
  )
}
