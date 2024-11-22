// src/components/OptionsMenu.tsx
import React from 'react';

const OptionsMenu: React.FC = () => {
    return (
        <aside className="fixed right-0 top-16 p-4 bg-black h-full w-1/5 flex flex-col space-y-4">
            <button className="text-green-400 hover:text-purple-400">Today</button>
            <button className="text-green-400 hover:text-purple-400">Future</button>
            <button className="text-green-400 hover:text-purple-400">Map</button>
        </aside>
    );
};

export default OptionsMenu;
