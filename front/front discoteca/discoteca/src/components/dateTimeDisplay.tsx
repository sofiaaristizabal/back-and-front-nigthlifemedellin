// src/components/DateTimeDisplay.tsx
import React, { useState, useEffect } from 'react';

const containerStyle = {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 255, 0, 0.3)', // Green subtle shadow for depth
    border: '2px solid #6a0dad', // Purple border for a night-life aesthetic
};

const DateTimeDisplay: React.FC = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        // Update the date and time every second
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, []);

    const dateString = currentDateTime.toLocaleDateString();
    const timeString = currentDateTime.toLocaleTimeString();

    return (
        <div
            style={containerStyle}
            className="bg-black p-8 rounded-lg border border-purple-600 flex flex-col items-center justify-center text-white"
        >
            <h3 className="text-3xl font-extrabold">Today's Date</h3>
            <p className="text-5xl mt-2 text-green-500 font-extrabold">{dateString}</p>
            <h3 className="text-3xl font-extrabold mt-4">Current Time</h3>
            <p className="text-4xl mt-2 text-green-500 font-extrabold">{timeString}</p>
            <p className="text-xl mt-6 text-white text-center font-serif">
                <i>Dile que bailando la conocí…</i> Don Omar
            </p>
        </div>
    );
};

export default DateTimeDisplay;