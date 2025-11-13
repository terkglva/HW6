// pages/About.jsx - В стиле Технического Манифеста Рика

import React from 'react';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-content">
                <h1>
                    <span style={{color: 'var(--color-acid-purple)'}}>[SECTION 42-A]</span>: 
                    The Project Manifest
                </h1>
                
                <p style={{color: 'var(--color-text-dim)'}}>
                     The "Character Explorer" V3.14 (Better than the V3.0, obviously).
                </p>

                <h2 className="about-section-header">
                    1. Purpose of Operation
                </h2>
                <p>
                    This is a comprehensive, multi-dimensional database built to categorize 
                    the vast and usually depressing array of entities encountered across 
                    known realities. Its primary function is to prevent embarrassing 
                    mix-ups, such as mistaking an Evil Morty for a regular one, or forgetting 
                    which dimension you stashed a particular Jerry in.
                </p>

                <h2 className="about-section-header">
                    2. Technical Specifications
                </h2>
                <ul>
                    <li>**Interface Logic:** React.js (Chosen for its structural integrity, unlike Jerry's marriage).</li>
                    <li>**Styling Protocol:** CSS (Dark Theme/Neon Green & Purple, because anything else is amateur hour).</li>
                    <li>**Data Source:** The Rick and Morty API (Unsanctioned data scraping is more fun, but less legal).</li>
                    <li>**Security:** Minimal. If Evil Morty wants in, he's getting in. Don't store your passwords here.</li>
                </ul>

                <h2 className="about-section-header">
                    3. Disclaimer (Mandatory)
                </h2>
                <p>
                    All character information is based on observations, potentially 
                    unreliable test results, and frankly, guesswork. The project 
                    creators (Morty and a couple of interns) are not responsible 
                    for psychological trauma, existential dread, or interdimensional 
                    parasites resulting from the exploration of this data.
                </p>
                
                <blockquote className="about-note">
                    <p>**Morty's Emergency Note:**</p>
                    <p>"Just look at the pretty colors and try not to think about 
                    how small you are in the grand scheme of things. Also, do not 
                    click on anything labeled 'Time Travel'."</p>
                </blockquote>
            </div>
        </div>
    );
};

export default About;