// src/components/NavBar.tsx
import React from 'react';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-purple-800 p-4 flex justify-between">
            <h1 className="text-white text-2xl">Discotecas</h1>
            <ul className="flex space-x-4">
                <li>
                    <a href="#today-events" className="text-white hover:text-green-400">
                        Today Events
                    </a>
                </li>
                <li>
                    <a href="#map-section" className="text-white hover:text-green-400">
                        Map
                    </a>
                </li>
                <li>
                    <a href="#future-events" className="text-white hover:text-green-400">
                        Future Events
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
