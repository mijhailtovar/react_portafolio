import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

//importar componentes
import MiComponente from "./components/MiComponente";
import Peliculas from './components/Peliculas';
import Error from "./components/Error";
import Prueba from "./components/prueba_segmento_dinamico";

import Header from './components/Header'
import Footer from './components/Footer'
import Home from "./components/home";
import Blog from "./components/Blog";
import Formulario from "./components/Formulario";
import Search from "./components/Search";
import Parametros_busqueda from "./components/Parametros_busqueda"
import Article from "./components/Article";
import Article_parametros from "./components/Article_parametros";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";

class Router extends Component {

    render() {


        return (
            <BrowserRouter>

                <Header />


                {/**CONFIGURAR RUTAS Y PAGINAS */}
                {/* 2. Reemplazamos Switch por Routes */}
                <Routes>
                    {/* 3. Cambiamos la prop 'component' por 'element' y pasamos el componente como un elemento JSX */}
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/blog" element={<Blog />} />
                    <Route exact path="/blog/articulo/:id" element={ <Article_parametros /> } />
                    <Route exact path="/blog/crear" element={ <CreateArticle /> } />
                    <Route exact path="/blog/editar/:id" element={ <EditArticle /> } />

                    <Route exact path="/blog/busqueda/:search" element={<Parametros_busqueda />} />
                 
                    <Route exact path="/formulario" element={<Formulario />} />
                    <Route exact path="/peliculas" element={<Peliculas />} />

                    {/**rutas de prueba */}
                    <Route exact path="/segunda-ruta" element={<MiComponente />} />
                    <Route exact path="/pagina-1" element={
                        <>
                            <h1>Hola mundo desde la ruta pagina 1</h1>
                            <MiComponente saludo="hola amigo" />
                        </>
                    } />
                    <Route exact path="/pruebas/:nombre/:apellidos?" element={<Prueba />} />

                    {/* 3. Añade la ruta de error AL FINAL */}
                    <Route path="*" element={<Error />} />
                </Routes>

                <div className='clearfix'></div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;