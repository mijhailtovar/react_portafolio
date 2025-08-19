import React, { Component } from "react";
import MiComponente from './MiComponente'

class SeccionPruebas extends Component {

    contador = 0;

    /*
    constructor(props){
        super(props);

        this.state = {
            contador: 0
        };
    }
    */

    state = {
        contador: 0
    };

    holaMundo(nombre, edad) {
        let presentacion = (
            <>
                <p>Hola soy {nombre} </p>
                <p>Mi edad es {edad} años </p>
            </>
        );

        return presentacion;
    }

    sumar = (e) => {
        //this.contador = this.contador + 1;
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    restar = (e) => {
        //this.contador = this.contador - 1;
        this.setState({
            contador: (this.state.contador - 1)
        });
    }

    render() {
        return (
            <section id='content'>
                <h2 className="subheader">Ultimos articulos</h2>
                <div className="card">

                    <h2 className="subheader">Funciones y JSX basico</h2>

                    <div>
                        {this.holaMundo('Mijhail tovar', 23)}
                    </div>

                    <h2 className="subheader">Componentes</h2>
                    <section className='componentes' >

                        <MiComponente />
                        <MiComponente />

                    </section>

                    <h2 className="subheader">Estado</h2>

                    <p>
                        Contador: {this.state.contador}
                    </p>
                    <p>
                        <input type="button" value="Sumar" onClick={this.sumar} />
                        <input type="button" value="Restar" onClick={this.restar} />
                    </p>

                </div>
            </section>
        );
    }
}

export default SeccionPruebas;
