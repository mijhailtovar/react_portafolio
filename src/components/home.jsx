import React, { Component } from "react";
import Slider from './Slider'
import Sidebar from './Sidebar'
import Articles from "./Articles";

class Home extends Component {

    render() {

        return (
            <div id="home">
                <Slider
                    title="Bienvenido al Curso de React"
                    btn={'ir al blog'}
                    size="slider-big"
                />
                <div className='center'>
                    <div id="content">
                        <h1 className="subheader">Ultimos articulos</h1>
                        <Articles 
                            home="true"
                        />
                    </div>
                </div> {/**End div Center */}

                <Sidebar />                
            </div>
        );
    }
}

export default Home;