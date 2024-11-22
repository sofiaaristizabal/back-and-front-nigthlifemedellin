// src/components/EventPopup.tsx
import React from 'react';

interface EventDetails {
    flyer: string;
    name: string;
    description: string;
    location: string;
    cover:string;
    hora:string;
    onClose: () => void;
}

const EventPopup: React.FC<EventDetails> = ({ flyer, name, description, location, onClose, cover, hora }) => {
    return (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-70 z-50">
            <div className="w-full max-w-md bg-white text-black p-6 rounded-l-lg shadow-lg transform transition-transform duration-500 ease-out translate-x-0">
                {/* Event Details */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold text-purple-600">{name}</h2>
                        <button
                            onClick={onClose}
                            className="text-red-500 hover:text-red-700 text-2xl font-bold"
                        >
                            &times;
                        </button>
                    </div>
                    <img src={flyer} alt={name} className="w-full h-40 object-cover rounded-lg shadow-md" />
                    <p className="text-gray-700">{description}</p>
                    <p className="font-semibold text-purple-600">Location: {location}</p>
                    <p className="font-semibold text-purple-600">$$: {cover}</p>
                    <p className="font-semibold text-purple-600">Hora de inicio: {hora}</p>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventPopup;
