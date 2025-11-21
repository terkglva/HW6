

import React from 'react';

const ErrorBox = ({ message }) => {
    const errorStyle = {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '500px',
        backgroundColor: 'rgba(163, 0, 0, 0.15)', // Темно-красный фон
        border: '1px solid #a30000', 
        color: '#ffcccc',
        borderRadius: '8px',
        textAlign: 'center',
    };

    return (
        <div style={errorStyle}>
            <h3>⚠️ Access Denied / Error</h3>
            <p>{message || "An unknown dimensional anomaly occurred."}</p>
        </div>
    );
};

export default ErrorBox;