import React, { Component } from "react";
import Logo from '../assets/images/react.svg';
import { NavLink } from "react-router-dom";

class Header extends Component {
    render() {

        return (
            <header id="header">
                <div className="center">
                    {/** LOGO*/}
                    <div id="logo">
                        <img src={Logo} alt="logotipo" className="app-logo" />
                            <span id="brand">
                                <strong>Curso</strong>React
                            </span>
                    </div>
                    {/* MENU */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to={"/home"} activeclassname="active">Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Blog"} activeclassname="active">BLog</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/formulario"} activeclassname="active">Formulario</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/peliculas"} activeclassname="active">peliculas</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/pruebas/mijhail"} activeclassname="active">pagina 2</NavLink>
                            </li>
                        </ul>
                    </nav>

                    {/*limpiar flotados*/}
                    <div className="clearfix"></div>

                </div>

            </header>
        );
    }
}

export default Header;