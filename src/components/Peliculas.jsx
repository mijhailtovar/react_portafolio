import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from './Slider'
import Sidebar from './Sidebar'


class Peliculas extends Component {
    state = {};

    //metodo
    cambiarTitulo = () => {

        var { peliculas } = this.state;
        //var random = Math.floor(Math.random() * 4);

        peliculas[0].titulo = "Batman Begins"

        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("FAVORITA MARCADA");
        console.log(pelicula, indice);

        this.setState({
            favorita: pelicula
        });
    }

    //metodo que se ejecuta cuando se carga un componente, se crea un componente
    componentWillMount() {
        //alert("Se va a montar el componente");
        this.setState({
            peliculas: [
                { titulo: 'Batman vs Superman', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPHsAg9qO7fesLRuks53bVvl7TYLrhmmxhg&s' },
                { titulo: 'Los Vengadores EndGame', image: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/7b350a2f-0b3e-4033-8125-34c4d67e3bbe/compose?aspectRatio=1.78&format=webp&width=1200' },
                { titulo: 'Looper', image: "https://m.media-amazon.com/images/S/pv-target-images/f3946a55bbec57b041183ee0eb7121192769c96b950529bc75e4e0573d715eaa._UR1920,1080_.jpg" },
                { titulo: 'El niño y la garza', image: 'https://www.laprensagrafica.com/__export/1704344540116/sites/prensagrafica/img/2024/01/03/ffam04012024xxgarza262.jpg_423682103.jpg' }

            ],
            nombre: 'Victor Robles',
            favorita: {}
        });
    }

    componentDidMount() {
        //alert("Ya se ha montado el componente");
    }

    componentWillUnmount() {
        //alert("Me voy a desmontar");
    }

    render() {

        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es: </strong>
                    <span> {this.state.favorita.titulo} </span>
                </p>
            );
        } else {
            favorita = (
                <p>No hay pelicula favorita</p>
            );
        }

        return (
            <>
                <Slider
                    title="Peliculas"
                    size="slider-small"
                />

                <div className='center'>
                    <div id="content" className="peliculas">

                        <h2 className="subheader" >Listado de peliculas</h2>
                        <p>Seleccion de las peliculas favoritas de {this.state.nombre} </p>
                        <p>
                            <button onClick={this.cambiarTitulo} >
                                Cambiar titulo de batman
                            </button>
                        </p>

                        {/*this.state.favorita.titulo ? (
                    <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span> {this.state.favorita.titulo} </span>
                    </p>
                ) : (
                    <p>No hay pelicula favorita</p>
                )
                */}
                        {
                            favorita
                        }


                        {/**Crear componente pelicula */}

                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <Sidebar
                        blog="false"
                    />
                </div>
            </>

        );
    }

}

export default Peliculas;