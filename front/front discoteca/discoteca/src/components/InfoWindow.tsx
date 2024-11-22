// src/components/InfoWindowComponent.tsx
import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

interface InfoWindowComponentProps {
    discoteca: string;
    name: string;
    description: string;
    cover: number | null; // Cover charge can be null if no cover
    flyer: string; // Path to the event flyer
    onClose: () => void;
    position: {lat: number; lng: number };
}

const InfoWindowComponent: React.FC<InfoWindowComponentProps> = ({
                                                                     discoteca,
                                                                     name,
                                                                     description,
                                                                     cover,
                                                                     flyer,
                                                                     onClose,
                                                                     position,
                                                                 }) => {
    return (
        <InfoWindow position={position} onCloseClick={onClose}>
            <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 rounded-lg shadow-lg max-w-xs">
                {/* Event Flyer */}
                <img src={flyer} alt={name} className="w-full h-32 object-cover rounded-lg mb-2" />

                {/* Discoteca Name */}
                <h2 className="text-2xl font-extrabold text-green-400 mb-1">{discoteca}</h2>

                {/* Event Name */}
                <h3 className="text-xl font-bold text-yellow-300 mb-2">{name}</h3>

                {/* Description */}
                <p className="text-gray-300 mb-4">{description}</p>

                {/* Price and Cover Details */}
                <div className="flex items-center justify-between">
                    {/* Price Indicator */}
                    {/* <div className="text-yellow-400 text-lg">
                        {price === '$' && <span>$ Cheap</span>}
                        {price === '$$' && <span>$$ Average</span>}
                        {price === '$$$' && <span>$$$ Expensive</span>}
                    </div> */}

                    {/* Cover Charge */}
                    <div className="text-red-400 text-lg">
                        {cover ? <span>Cover: ${cover}</span> : <span>No cover</span>}
                    </div>
                </div>

                {/* Party Flair */}
                <div className="mt-4">
                    <span className="bg-purple-600 text-black px-2 py-1 rounded-full text-sm font-semibold tracking-wider">
                        Night Party
                    </span>
                </div>
            </div>
        </InfoWindow>
    );
};

export default InfoWindowComponent;
