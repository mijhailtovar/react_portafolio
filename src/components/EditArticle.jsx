import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importa los hooks necesarios
import axios from 'axios';
import { useParams } from 'react-router-dom';
//importar el validador de los formularios
import SimpleReactValidator from 'simple-react-validator';
// alertas visuales
import swal from 'sweetalert';
import Global from '../Global';
// Ya no necesitas el componente Redireccion
import Sidebar from './Sidebar';
import imageDefault from '../assets/images/imageDefault.jpg'


// 1. tenemos que recoger el id del articulo a editar de la url
// 2 tenemos que crear un metodo para sacar ese objeto del backend
// 3. repoblar / rellenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una peticion a backend

function EditArticle() {

    //inicializa los parametros recibidos por la url
    const params = useParams();
    //var articleId = null;

    const url = Global.url;
    const navigate = useNavigate(); // 3. Usa el hook de navegación

    // 4. Maneja el estado con useState
    const [article, setArticle] = useState({});
    const [status, setStatus] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // 5. Usa useRef para acceder a los valores del formulario
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    // 3. Inicializa el validador con useRef. Su valor persiste entre renderizados.
    //esta variable se encargara de la validacion del formulario y los mensajes de error
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'Este campo es requerido.',
            alpha_space: 'Solo se permiten letras y espacios.',
            alpha_num_space: 'Solo se permiten letras, numeros y espacios'
        }
    }));

    // 6. El hook useEffect manejará la redirección como un efecto secundario
    /**este metodo es como componentWillMount se ejecuta cada vez que se lance el componente */
    // useEffect para cargar los datos del artículo UNA SOLA VEZ
    useEffect(() => {
        console.log("El componente se ha montado. Obteniendo artículo...");
        const articleIdFromUrl = params.id;
        if (articleIdFromUrl) {
            gerArticle(articleIdFromUrl);
        }

        return () => {
            console.log('El componente se va a desmontar.');
        };
    }, [params.id]); // Se ejecuta solo si el ID de la URL cambia (o al montar)

    // useEffect para manejar la redirección cuando el estado cambia a 'success'
    useEffect(() => {
        if (status === 'success') {
            navigate('/blog');
        }
    }, [status, navigate]); // Se ejecuta solo si 'status' o 'navigate' cambian

    const gerArticle = (id) => {
        axios.get(url + 'article/' + id)
            .then(res => {
                setArticle(res.data.article);
            });
    }

    console.log("validator:");
    console.log(validator);

    // 4. Crea una función para manejar los cambios en los inputs.
    // cada vez que se modifique los formularios el valor de article cambiara,
    // y se mostraran los mensajes de error
    const changeState = (e) => {
        setArticle({
            title: titleRef.current.value,
            content: contentRef.current.value,
            image: article.image,
            [e.target.name]: e.target.value
        });

        // Opcional: Validar mientras el usuario escribe
        validator.current.showMessages();
    };

    const saveArticle = (e) => {
        e.preventDefault();

        // Recoge los datos del formulario usando las referencias,
        // para guardarlos en la base de datos
        const articleData = {
            title: titleRef.current.value,
            content: contentRef.current.value,
        };
        console.log(article);

        //si la validacion no dio problemas
        if (validator.current.allValid()) {
            // Petición POST para guardar el artículo
            axios.put(url + 'article/' + params.id, articleData)
                .then(res => {
                    if (res.data.article) {
                        // Actualiza el estado
                        setArticle(res.data.article);
                        setStatus('waiting');

                        swal(
                            'Articulo actualizado',
                            'El articulo ha sido actualizado correctamente',
                            'success'
                        )

                        // subir el archivo/imagen
                        if (selectedFile !== null) {

                            //Sacar el id del articulo guardado
                            //var articleId = res.data.article._id;
                            // console.log(res.data.article);
                            // console.log(article);

                            // Crear form data y añadir el fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                selectedFile,
                                selectedFile.name
                            );

                            // peticion ajax
                            axios.post(url + 'upload-image/' + params.id, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        setArticle(res.data.article);
                                        setStatus('success');
                                    } else {
                                        setArticle(res.data.article);
                                        setStatus('failed');
                                    }
                                });

                        } else {
                            setStatus('success');
                        }

                    } else {
                        setStatus('failed');
                    }
                });
        } else {
            //como no esta validado el formulario el estado es fallido
            setStatus('failed');
            //muestra los mensajes de error y fuerza la actualizacion de la pagina
            validator.current.showMessages();

        }


    };

    const fileChange = (event) => {
        //console.log(event);
        //actualiza el estado para los archivos subidos
        setSelectedFile(event.target.files[0]);

        //console.log(selectedFile);
    };

    console.log(article);
    return (
        <div className="center">
            <section id="content">
                <h1 className="subheader">
                    Editar articulo
                </h1>
                {/**si existe el titulo se muestra el formulario */}
                {article.title &&
                    <form action="" className="mid-form" onSubmit={saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            {/* 7. Asigna la referencia al input */}
                            <input type="text" name="title" defaultValue={article.title} ref={titleRef} onChange={changeState} />

                            {/* 8. Accede al validador a través de .current */}
                            {validator.current.message('title', article.title, 'required|alpha_num_space')}

                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            {/* 8. Asigna la referencia al textarea */}
                            <textarea name="content" defaultValue={article.content} ref={contentRef} onChange={changeState}></textarea>

                            {/* 8. Accede al validador a través de .current */}
                            {validator.current.message('content', article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={fileChange} />

                            <div className="image-wrap">
                                {
                                    article.image !== null ? (
                                        <img src={url + "get-image/" + article.image} alt={article.title} className='thumb' />
                                    ) : (
                                        <img src={imageDefault} alt={article.title} className='thumb' />
                                    )
                                }
                            </div>

                        </div>

                        <div className='clearfix'></div>
                        <input type="submit" value={"Guardar"} className="btn btn-success" />
                    </form>
                }

                {/**si NO existe el titulo se muestra el formulario */}
                {!article.title &&
                    <h1 className='subheader'>Cargando...</h1>
                }



            </section>

            <Sidebar />
        </div>
    );
}

export default EditArticle;