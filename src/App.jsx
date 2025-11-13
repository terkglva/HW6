// src/App.jsx - Только настройка роутера

import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// Layout
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';
import Login from './pages/Login';

// Настройка всех 5 маршрутов
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            {/* / */}
            <Route index element={<Home />} />
            
            {/* /about */}
            <Route path="about" element={<About />} />

            {/* /items (Список) */}
            <Route path="items" element={<CharacterList />} />
            
            {/* /items/:id (Детали) */}
            <Route path="items/:id" element={<CharacterDetails />} />
            
            {/* /login */}
            <Route path="login" element={<Login />} />
            
            {/* Обработка 404 */}
            <Route path="*" element={<h1 style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>404 - Dimension Not Found</h1>} />
        </Route>
    )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;