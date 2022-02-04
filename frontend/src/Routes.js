import React from "react";
import { Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp'



const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<SignUp />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default PageRoutes;
