import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importa los hooks necesarios
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import Global from "../Global";
import Sidebar from "./Sidebar";
//dependecia de fechas moderna
import { format } from 'date-fns'; // 👈 1. Importa 'format'
import es from 'date-fns/locale/es'; // 👈 Opcional: para formato en español
import imageDefault from '../assets/images/imageDefault.jpg'




function Article({ params }) {

    const url = Global.url;
    const navigate = useNavigate(); // 3. Usa el hook de navegación

    // 4. Maneja el estado con useState
    const [article, setArticle] = useState({});
    const [status, setStatus] = useState(null);

    // 6. El hook useEffect manejará la redirección como un efecto secundario
    /**este metodo es como componentWillMount se ejecuta cada vez que se lance el componente */
    useEffect(() => {
        console.log("el metodo 'CreateArticle' se creo");

        getArticle();

        return () => {
            console.log('El componente se va a desmontar. Aquí puedes limpiar recursos.');
        };
    }, [status]); // Este código solo se ejecuta cuando 'status' cambia


    const getArticle = () => {
        var id = params.id;

        axios.get(url + 'article/' + id)
            .then(res => {

                // Actualiza el estado
                setArticle(res.data.article);
                setStatus('success');

            }).catch(err => {
                // Actualiza el estado
                setArticle(false);
                setStatus('success');
            });
    }

    const deleteArticle = (id) => {
        //trozo de codigo para la alerta de estas seguro de borrar?
        swal({
            title: "Estas seguro?",
            text: "Una vez se borre el articulo no se podra recuperar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    
                    axios.delete(url + 'article/' + id)
                        .then(res => {

                            // Actualiza el estado
                            setArticle(res.data.article);
                            setStatus('deleted');

                            swal(
                                'Articulo borrado',
                                'El articulo ha sido borrado correctamente',
                                'success'
                            );

                        });
                    navigate('/blog');
                } else {
                    swal(
                        'Tranquilo!!',
                        'no se ha borrado nada',
                        'success'
                    );
                }
            });

        /*
               
                    */

    }


    return (
        <div className="center">
            <section id="content">

                {article &&
                    <article className="article-item article-detail">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={url + "get-image/" + article.image} alt={article.title} />
                                ) : (
                                    <img src={imageDefault} alt={article.title} />
                                )
                            }
                        </div>

                        <h1 className="subheader"> {article.title} </h1>
                        <span className="date">
                            {/* 👇 Si article.date existe, entonces formatea la fecha */}
                            {article.date && format(new Date(article.date), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                        </span>
                        <p>
                            {article.content}
                        </p>

                        <button onClick={
                            () => {
                                deleteArticle(article._id)
                            }
                        }

                            className="btn btn-danger">Eliminar</button>

                        <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>


                        {/*limpiar flotados*/}
                        <div className="clearfix"></div>
                    </article>
                }

                {!article && status === 'success' &&
                    <div id="article">
                        <h2 className="subheader">El articulo no existe</h2>
                        <p>intentalo de nuevo mas tarde</p>
                    </div>
                }

                {!status == null &&
                    <div id="article">
                        <h2 className="subheader">Cargando</h2>
                        <p>Espere unos segundos</p>
                    </div>
                }

            </section>

            <Sidebar />

        </div>
    );


}

export default Article;
