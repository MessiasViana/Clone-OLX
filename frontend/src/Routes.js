import React from "react";
import { Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About'



export default () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />}/>
        </Routes>
    );
}
