// src/components/FutureEvents.tsx
import React, { useEffect } from 'react';
import { useState } from 'react';

interface FutureEventsProps {
    onEventClick: (event: any) => void;
    passEventsToMap: (events: any) => void;
}

const FutureEvents: React.FC<FutureEventsProps> = ({ onEventClick, passEventsToMap }) => {

    const [events, setEvents] = useState<any[]>([]); 

  const url = "https://back-and-front-nigthlifemedellin.onrender.com/eventos";

  useEffect(()=>{
    
    const fetchEvents = async () =>{

        try{
           
            const response = await fetch(url);

            if(response.ok){

                const data = await response.json(); 
                console.log(data)  

                const today = new Date();
                console.log(today)
                const filteredEvents = data.filter((event:any)=> {
                    const eventDate = new Date(event.fecha);
                    return eventDate > today;
                });
                console.log(filteredEvents);

                const formattedEvents = filteredEvents.map((event:any) => ({

                  id: event.id,
                  name: event.nombre,
                  date: event.fecha,
                  hour: event.hora,
                  cover: event.cover,
                  discoteca: event.discoteca.fullName,
                  redSocial: event.discoteca.redSocial, 
                  img: event.discoteca.profileImage || '/defaultrumba.jpg',

                }));
               
                  setEvents(formattedEvents);
                  passEventsToMap(formattedEvents);
            } else{
                throw new Error(`Error obteniendo los eventos: ${response.statusText}`);
            }

        }catch (error){
            console.error('Error fetching or processing events:', error);
        }
    };

    fetchEvents();

  }, []);

    {/*
    const futureEvents = [
        { id: 1, name: 'Electro Fest', discoteca: 'Dulcinea', img: 'src/assets/dulcinea.png', position: { lat: 6.2083, lng: -75.5679 } },
        { id: 2, name: 'Techno Vibes', discoteca: 'Miranda', img: 'src/assets/miranda.jpeg', position: { lat: 6.2101, lng: -75.5701 } },
        { id: 3, name: 'Halloween Party', discoteca: 'La Logia', img: 'src/assets/laLogia.jpeg', position: { lat: 6.2112, lng: -75.5689 } },
    ];

    useEffect(() => {
        passEventsToMap(futureEvents);
    }, []); */}

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            {events.map(event => (
                <div
                    key={event.id}
                    className="bg-purple-600 p-4 rounded-lg hover:bg-purple-700 transition cursor-pointer"
                    onClick={() => onEventClick(event)}
                >
                    <h3 className="text-white text-lg">{event.name}</h3>
                    <p className="text-gray-300">{event.discoteca}</p>
                    <img src={event.img} alt={event.discoteca} className="w-full h-32 object-cover mt-2 rounded-md" />
                </div>
            ))}
        </div>
    );
};

export default FutureEvents;
