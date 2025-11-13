import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <h1 className="home-title">
                Wubba Lubba Dub Dub!
            </h1>
            
            <p className="home-subtitle">
                Welcome to the Citadel of Ricks... and Mortys.
            </p>

            <p style={{maxWidth: '600px', color: 'var(--color-text-dim)'}}>
                Dive into the infinite multiverse! We've cataloged every known version 
                of your favorite characters. Track their dimensions, status, and first 
                (and likely traumatic) appearance.
            </p>

            <Link to="/items" className="cta-button">
                Explore the Multiverse Now
            </Link>

           
            <div className="portal-graphic-container">
                <img 
                    src="/portal.jpg" 
                    alt="Rick and Morty Portal"
                    className="portal-graphic"
                />
                <p style={{fontSize: '0.8rem', color: 'var(--color-portal-green)', marginTop: '5px'}}>
                    (Don't stand too close to the green stuff)
                </p>
            </div>
        </div>
    );
};

export default Home;