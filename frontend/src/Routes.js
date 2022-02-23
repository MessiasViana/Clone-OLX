import React from "react";
import { Routes, Route } from 'react-router-dom';
import RequireAuth from "./helpers/RouteHandler";

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import MyAccount from './pages/MyAccount';
import UpdateAd from './pages/UpdateAd';


const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<SignUp />}/>
            <Route path="/ad/:id" element={<AdPage />}/>
            <Route path="/post-an-ad" element={<RequireAuth private> <AddAd /> </RequireAuth>}/>
            <Route path="/ads" element={<Ads />}/>
            <Route path="/minha-conta" element={<MyAccount />}/>
            <Route path="/atualizar-ad/:id" element={<UpdateAd />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default PageRoutes;
