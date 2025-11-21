// src/components/Spinner.jsx

import React from 'react';

const Spinner = () => {
    
    const spinnerStyle = {
        border: '4px solid rgba(104, 237, 41, 0.1)',
        borderTop: '4px solid #68ed29', // Портальный зеленый
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '50px auto',
    };
    
    
    
    return (
        <div style={{textAlign: 'center'}}>
            <div style={spinnerStyle}></div>
            <p style={{color: 'var(--color-text-dim)'}}>Loading dimension data...</p>
        </div>
    );
};

export default Spinner;