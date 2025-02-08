// src/components/MapContainer.tsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import InfoWindowComponent from './InfoWindow.tsx';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 255, 0, 0.3)', // Green subtle shadow for depth
    border: '2px solid #6a0dad', // Purple border for a night-life aesthetic
};

const center = {
    lat: 6.2088, // Center the map on El Poblado, Medellín
    lng: -75.5679,
};

const mapOptions = {
    mapId: 'ee53c635f9d0620a', // Your custom map ID
    disableDefaultUI: true, // Hide default controls for a cleaner look
    zoomControl: true, // Keep zoom control
};

// Event Data for TodayEvents


interface MapContainerProps {
    events: any[]; // Replace `any` with the actual event type if available
    passEventsToMap: (events: any) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({passEventsToMap}) => {
    const [selectedEvent, setSelectedEvent] = useState<any>(null); // Track selected marker
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

    const [eventos, setEventos] = useState<any[]>([]); 

    const url = "https://back-and-front-nigthlifemedellin.onrender.com/eventos";

    // Ensure Google Maps API is loaded before rendering
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (window.google && window.google.maps) {
                setIsGoogleMapsLoaded(true);
                clearInterval(intervalId);
            }
        }, 100);

        const fetchEvents = async () =>{

            console.log('MAPA');
    
            try{
               
                const response = await fetch(url);
    
                if(response.ok){
    
                    const data = await response.json(); 
                    console.log(data)  
    
                    const today = new Date().toISOString().split('T')[0];
                    console.log(today)
                    const filteredEvents = data.filter((event:any)=> event.fecha === today);
                    console.log(filteredEvents);
    
                    const formattedEvents = filteredEvents.map((event:any) => ({
    
                      id: event.id,
                      name: event.nombre,
                      date: event.fecha,
                      hour: event.hora,
                      cover: event.cover,
                      discoteca: event.discoteca.fullName,
                      redSocial: event.discoteca.redSocial, 
                      latitud: event.discoteca.latitud,
                      longitud: event.discoteca.longitud,
                      img: event.discoteca.profileImage || '/defaultrumba.jpg',
                    //   position: { lat: Number(selectedEvent.latitud), lng: Number(selectedEvent.longitud) }
    
                    }));
                   
                      setEventos(formattedEvents);
                      //setSelectedEvent(formattedEvents);
                      passEventsToMap(formattedEvents);
                } else{
                    throw new Error(`Error obteniendo los eventos: ${response.statusText}`);
                }
    
            }catch (error){
                console.error('Error fetching or processing events:', error);
            }
        };
    
        fetchEvents();

        return () => clearInterval(intervalId);

       
    }, []);

    return (
        <div className="bg-black p-4 rounded-lg border border-purple-600">
            <LoadScript googleMapsApiKey="AIzaSyDLzZMfEaVuDdL73BDqlleX9wFGQaEJ2EI">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    options={mapOptions}
                >
                    {isGoogleMapsLoaded && 
                        eventos.map((event) => (
                           
                            <Marker
                                key={event.id}
                                position={{ lat: Number(event.latitud), lng: Number(event.longitud)}}
                                icon={{
                                    url: event.img, // Use the discoteca flyer as the marker icon
                                    scaledSize: new window.google.maps.Size(40, 40), // Marker size
                                }}
                                onClick={() => setSelectedEvent(event)} // Open InfoWindow on marker click
                            />
                        ))}

                    {selectedEvent && (
                        <InfoWindowComponent
                            discoteca={selectedEvent.discoteca}
                            name={selectedEvent.name}
                            description={selectedEvent.description}
                            cover={selectedEvent.cover}
                            flyer={selectedEvent.img} // Add event flyer
                            onClose={() => setSelectedEvent(null)}
                            position={{ lat: Number(selectedEvent.latitud), lng: Number(selectedEvent.longitud) }}

                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapContainer;
