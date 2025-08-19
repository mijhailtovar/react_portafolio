import React, { Component, use } from "react";
import Slider from './Slider'
import Sidebar from './Sidebar'
import Articles from "./Articles";
//para recoger los parametros de la url
import { useParams } from "react-router";

class Search extends Component {

    render() {

        // Accede a los parámetros desde las props
        const searched = this.props.params; 
        
        return (
            <div id="blog">
                <Slider
                    title={"Busqueda: " + searched.search}
                    size="slider-small"
                />
                <div className='center'>
                    <div id="content">
                        {/**listado de articulos que vendran del api rest de node */}

                        <Articles 
                            search={searched.search}
                        />
                        
                    </div>
                </div> {/**End div Center */}

                <Sidebar
                    blog="true"
                />
            </div>
        );
    }
}

export default Search;