import { useParams } from 'react-router-dom';
import Article from './Article'; // Renombra tu componente de clase si es necesario

function Article_parametros() {
    const params = useParams();
    // Pasa los params como props a tu componente de clase
    //console.log(params);
    /**aqui se le pasa al componente de verdad, que realizara la busqueda
     * le pasamos los parametros de la url como props para que pueda
     * leerlos
     */
    return <Article params={params} />;
}

export default Article_parametros;