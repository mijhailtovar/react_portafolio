import { useParams } from 'react-router-dom';
import Search from './Search'; // Renombra tu componente de clase si es necesario

function Parametros_busqueda() {
    const params = useParams();
    // Pasa los params como props a tu componente de clase
    //console.log(params);
    /**aqui se le pasa al componente de verdad, que realizara la busqueda
     * le pasamos los parametros de la url como props para que pueda
     * leerlos
     */
    return <Search params={params} />;
}

export default Parametros_busqueda;