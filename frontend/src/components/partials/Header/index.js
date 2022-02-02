import React from "react";
import { Link } from "react-router-dom";
import { HeaderArea } from './styled';

import { isLogged } from "../../../helpers/authHandler";

const Header = () => {
    let logged = isLogged();

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/minha-conta">Minha Conta</Link>
                                </li>
                                <li>
                                    <Link to="/sair">Sair</Link>
                                </li>
                                <li>
                                    <Link to="" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged && 
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/cadastrar">Cadastrar</Link>
                                </li>
                            </>
                        }
                        
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;