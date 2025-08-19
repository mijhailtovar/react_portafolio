import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importa los hooks necesarios
import axios from 'axios';
//importar el validador de los formularios
import SimpleReactValidator from 'simple-react-validator';
// alertas visuales
import swal from 'sweetalert';
import Global from '../Global';
// Ya no necesitas el componente Redireccion
import Sidebar from './Sidebar';

// VAlidacion de formularios y alertas
function CreateArticle() {

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
    useEffect(() => {
        console.log("el metodo 'CreateArticle' se creo");

        // Si el estado cambia a 'success', redirige al blog
        if (status === 'success') {
            navigate('/blog');
        }

        return () => {
            console.log('El componente se va a desmontar. Aquí puedes limpiar recursos.');
        };
    }, [status]); // Este código solo se ejecuta cuando 'status' cambia

    console.log("validator:");
    console.log(validator);

    // 4. Crea una función para manejar los cambios en los inputs.
    // cada vez que se modifique los formularios el valor de article cambiara,
    // y se mostraran los mensajes de error
    const changeState = (e) => {
        setArticle({
            title: titleRef.current.value,
            content: contentRef.current.value,
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

        //si la validacion no dio problemas
        if (validator.current.allValid()) {
            // Petición POST para guardar el artículo
            axios.post(url + 'save', articleData)
                .then(res => {
                    if (res.data.article) {
                        // Actualiza el estado
                        setArticle(res.data.article);
                        setStatus('waiting');

                        swal(
                            'Articulo creado',
                            'El articulo ha sido creado correctamente',
                            'success'
                        )

                        // subir el archivo/imagen
                        if (selectedFile !== null) {

                            //Sacar el id del articulo guardado
                            var articleId = res.data.article._id;
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
                            axios.post(url + 'upload-image/' + articleId, formData)
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
        }else{
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

    return (
        <div className="center">
            <section id="content">
                <h1 className="subheader">
                    Crear articulo
                </h1>

                <form action="" className="mid-form" onSubmit={saveArticle}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        {/* 7. Asigna la referencia al input */}
                        <input type="text" name="title" ref={titleRef} onChange={changeState} />

                        {/* 8. Accede al validador a través de .current */}
                        {validator.current.message('title', article.title, 'required|alpha_num_space')}

                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        {/* 8. Asigna la referencia al textarea */}
                        <textarea name="content" ref={contentRef} onChange={changeState}></textarea>

                        {/* 8. Accede al validador a través de .current */}
                        {validator.current.message('content', article.content, 'required')}
                    </div>

                    <div className="form-group">
                        <label htmlFor="file0">Imagen</label>
                        <input type="file" name="file0" onChange={fileChange} />
                    </div>

                    <input type="submit" value={"Guardar"} className="btn btn-success" />
                </form>

            </section>

            <Sidebar />
        </div>
    );
}

export default CreateArticle;