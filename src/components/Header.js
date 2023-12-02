// src/components/Header.js
import mammothImage from '../assets/images/mainlogo.png';

import React from 'react';

const Header = ({ title }) => {
    return (
        <header>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="https://flowbite.com" class="flex items-center">
                        <img src={mammothImage} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Starving Mammoths</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Header;
