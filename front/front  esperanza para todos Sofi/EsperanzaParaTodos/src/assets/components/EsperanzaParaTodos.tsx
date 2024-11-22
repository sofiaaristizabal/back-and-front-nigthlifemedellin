import React from 'react';
import { Heart, Users, Globe, Handshake, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Partner {
  name: string;
  logo: string;
}

export const EsperanzaParaTodos: React.FC = () => {
  const partners: Partner[] = [
    { name: 'Cruz Roja Colombiana', logo: "/cruz-roja.png"  },
    { name: 'Fundación Colombiana de Trasplantes', logo: "/rinon.png" },
    { name: 'Ministerio de Salud', logo: "/seguro-de-salud.png" },
    { name: 'Organización Mundial de la Salud', logo: "/aplicacion-de-salud.png" }
  ];

  const navigate = useNavigate();

  const clickReceptor = () =>{

    navigate("/LoginReceptor");
 
 }

 const clickDonador = () =>{

  navigate("/LoginDonador");

}

  
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Header */}
      <header className="bg-blue-50 shadow-sm py-4 px-6">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Heart className="text-blue-600" size={40} />
            <h1 className="text-2xl font-bold text-blue-800">Esperanza Para Todos</h1>
          </div>
          <ul className="flex space-x-6 text-blue-700">
            <li><a href="#nosotros" className="hover:text-blue-900">Nosotros</a></li>
            <li><a href="#socios" className="hover:text-blue-900">Socios</a></li>
            <li><a href="#Donaciones" className="hover:text-blue-900">Donaciones</a></li>
          </ul>
        </nav>
      </header>

      {/* Sobre Nosotros */}
      <section id="nosotros" className="ml-14 container mx-auto py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className=" text-3xl font-bold text-blue-800 mb-6">Sobre Nosotros</h2>
          <p className="text-black-700 leading-relaxed">
            Somos una organización colombiana comprometida con salvar vidas a través de la ayuda humaniratia en el area de salud. 
            Desde nuestra fundación, hemos logrado conectar a más de 500 personas en necesidad de ayuda medica con exportos de la salud,
             transformando esperanza en vida real.
          </p>
          <div className="flex space-x-4 mt-6">
            <Globe className="text-blue-600" size={40} />
            <Users className="text-blue-600" size={40} />
            <Handshake className="text-blue-600" size={40} />
          </div>
        </div>
        <div className="flex justify-end mr-14">
        <img 
           src="/handsHelp.jpg" 
           alt="Hands Helping" 
           className="rounded-full shadow-md w-96 h-96 object-cover object-center animate-float"
/>
        </div>
      </section>

      {/* Aliados */}
      <section id="socios" className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">Nuestros Aliados Estratégicos</h2>
          <div className="flex justify-center space-x-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-24 h-24 mb-4 rounded-full"
                />
                <p className="text-black-700">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donaciones */}
      <section id="Donaciones" className="bg-blue-50 py-16"></section>
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">Tu Acción Puede Salvar Vidas</h2>
        <div className="flex justify-center space-x-20">
          <button className="w-64 bg-blue-500 text-white px-8 py-4 rounded-2xl 
          hover:bg-blue-600 transition"
          onClick={clickDonador}>
            Quiero hacer una donacion
          </button>
          <button className="w-64 bg-blue-500 text-white px-8 py-4 rounded-2xl
           hover:bg-blue-600 transition"
           onClick={clickReceptor}>
            Busco ayuda
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6">
        <div className="mt-4 text-2xl text-blue-100 text-center">
          <p>El Aporte Que Salva Vidas</p>
        </div>
      </footer>
    </div>
  )
}
