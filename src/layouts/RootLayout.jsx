// src/layouts/RootLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <main>
                <Outlet /> {/* Здесь будут отображаться все страницы */}
            </main>
        </>
    );
};

export default RootLayout;

