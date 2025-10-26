import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Importa useNavigate

// 1. Recibe la prop 'blog' directamente aquí
function Sidebar({ blog }) {

        const navigate = useNavigate(); // 2. Inicializa el hook

        const redirectToSearch  = (e) => {
            //comenta la linea de abajo esto para que al usar el buscador no tengass que 
            // regargar la pagina para que funcione
            //esta comentado para que funcione
            //e.preventDefault(); // Previene que la página se recargue
            const searchTerm = e.target.search.value; // Obtiene el valor del input
            
            //alert("tu input es: " + searchTerm);
            // 3. Redirige al usuario a la ruta de búsqueda
            
            console.log('/blog/busqueda/' + searchTerm);
            navigate('/blog/busqueda/' + searchTerm);         
        };

        const redirectToCreate = (e) => {
            navigate('/blog/crear/');  
        }

        return (
            <aside id="sidebar">
                {/* 2. Usa 'blog' directamente, sin 'this.props' */}
                {blog === "true" &&
                    <div id="nav-blog" className="sidebar-item" >
                        <h3>Puedes hacer esto</h3>
                        <a onClick={redirectToCreate} className="btn btn-success">Crear articulo</a>
                    </div>
                }

                <div id="search" className="sidebar-item" >
                    <h3>Buscador</h3>
                    <p>Encuentra el articulo que buscas</p>

                    <form onSubmit={redirectToSearch}>
                        <input type="text" name="search" />
                        <input type="submit" name="submit" value="buscar" className="btn" />
                    </form>
                </div>
            </aside>
        );
    
}

export default Sidebar;