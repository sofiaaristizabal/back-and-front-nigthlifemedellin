import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Proveedor{
  fullName: string;
  phoneNumber: string;
}

interface Organ {
  name: string;
  price: string;
  bloodType: string;
  isGood: string;
  type: string;
  donorInformation: string;
  HLA: string[];
  proveedor:Proveedor;
}

export const PaginaReceptor = () => {

  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchOrgans = async () => {
          try {
              const response = await fetch('http://localhost:3000/organos');
              if (!response.ok) {
                  throw new Error('Failed to fetch organs');
              }
              const data = await response.json();
              setOrgans(data);
          } catch (err) {
              setError(err instanceof Error ? err.message : 'Error fetching organs');
          } finally {
              setLoading(false);
          }
      };

      fetchOrgans();
      
      // Set up polling to check for new organs every 30 seconds
      const interval = setInterval(fetchOrgans, 30000);
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
   
   <header className="bg-blue-50 shadow-sm py-4 px-6">

   <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Heart className="text-blue-600" size={40} />
            <h1 className="text-2xl font-bold text-blue-800">Esperanza Para Todos</h1>
          </div>

           <button className="border-2 border-blue-500 bg-transparent hover:bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
            Relocalizacion
           </button>

        </nav>

   </header>

   <main className="container mx-auto py-8 mr-8 ml-8">
                <h2 className="text-2xl font-bold text-cyan-600 mb-6">Órganos Disponibles</h2>
                
                {loading && <p className="text-center">Cargando órganos...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organs.map((organ, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">{organ.name}</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Tipo:</span> {organ.type}</p>
                                <p><span className="font-medium text-cyan-700">Tipo de sangre:</span> {organ.bloodType}</p>
                                <p><span className="font-medium">Válido hasta:</span> {new Date(organ.isGood).toLocaleDateString()}</p>
                                <p><span className="font-medium text-cyan-700">Aporte requerido:</span> ${organ.price}</p>
                                <p><span className="font-medium">Proveedor: </span>{organ.proveedor.fullName}</p>
                                <p><span className="font-medium text-cyan-700">contacto: </span>{organ.proveedor.phoneNumber}</p>
                                <div>
                                    <span className="font-medium">HLA:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {organ.HLA.map((hla, i) => (
                                            <span key={i} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                                {hla}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
   </div>
  )
}
