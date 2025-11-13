// components/NavBar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    // Использование переменных из index.css через inline-стили
    const navStyle = {
        backgroundColor: 'var(--color-nav-bg)', // #111111
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #333333',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    };

    const logoStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: 'var(--color-portal-green)', 
        textDecoration: 'none',
        letterSpacing: '2px',
        textShadow: '0 0 5px rgba(104, 237, 41, 0.7)',
    };

    const linkContainerStyle = {
        display: 'flex',
        gap: '25px',
    };

    const linkStyle = (path) => ({
        color: location.pathname === path ? 'var(--color-portal-green)' : 'var(--color-text-light)',
        fontWeight: location.pathname === path ? '700' : '400',
        textTransform: 'uppercase',
        transition: 'color 0.3s ease',
        borderBottom: location.pathname === path ? '2px solid var(--color-portal-green)' : 'none',
        paddingBottom: '3px',
    });

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>
                R&M Explorer
            </Link>
            <div style={linkContainerStyle}>
                <Link to="/" style={linkStyle('/')}>
                    Home
                </Link>
                {/* 🔴 ИСПРАВЛЕНИЕ: Путь изменен с /characters на /items, согласно App.jsx */}
                <Link to="/items" style={linkStyle('/items')}>
                    Characters
                </Link>
                <Link to="/about" style={linkStyle('/about')}>
                    About
                </Link>
                <Link to="/login" style={linkStyle('/login')}>
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;