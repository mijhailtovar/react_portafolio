import { useNavigate } from "react-router-dom";

function Redireccion_blog(status){
    const navigate = useNavigate(); // 3. Usa el hook de navegación
    var redireccion = false;

    if (status === 'deleted') {
        navigate('/blog');
        redireccion = true;
    }

    return redireccion;
}

export default Redireccion_blog;