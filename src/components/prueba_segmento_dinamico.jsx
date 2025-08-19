import { useParams } from "react-router";

export default function Prueba() {
    let params = useParams();
    // params.id
    return (
        <div id="content">
            <h1 className="subheader">pagina de pruebas</h1>
            <h2> 
                {params.nombre && !params.apellidos &&
                    <> {params.nombre} </>
                } 
                {params.nombre && params.apellidos &&
                    <> {params.nombre + ' ' + params.apellidos} </>
                } 
            </h2>
        </div>
    );
}
