import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//dependecia de fechas moderna
import { format } from 'date-fns'; // 👈 1. Importa 'format'
import es from 'date-fns/locale/es'; // 👈 Opcional: para formato en español

import Global from '../Global';
import imageDefault from '../assets/images/imageDefault.jpg'

class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null
    };

    componentDidMount() {
        var home = this.props.home;
        var search = this.props.search;

        if (home === 'true') {
            this.getLastArticles();
        }else if (search && search !== null && search != undefined) {
            this.getArticlesBySearch(search);
        }else{
            this.getArticles();
        }

    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + "search/" + searched)
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            })
            .catch( err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    // Este código se ejecuta DESPUÉS de que el estado se actualizó.
                    //console.log('Estado actualizado:', this.state.articles);
                });
                //console.log(res.data.articles);
            });
    }

    getArticles = () => {
        axios.get(this.url + "articles")
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    // Este código se ejecuta DESPUÉS de que el estado se actualizó.
                    console.log('Estado actualizado:', this.state.articles);
                });
                //console.log(res.data.articles);
            });
    }

    render() {
        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article) => {

                return (
                    <article className="article-item" id="article-template" key={article._id}>
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url + "get-image/" + article.image} alt={article.title} />
                                ) : (
                                    <img src={imageDefault} alt={article.title} />
                                )
                            }
                        </div>

                        <h2> {article.title} </h2>
                        <span className="date">
                            {/* 👇 2. Usa la función format para mostrar la fecha */}
                            {format(new Date(article.date), 'dd/MM/yyyy', { locale: es })}
                        </span>
                        <Link to={'/blog/articulo/' + article._id} >Leer mas</Link>
                        {/**limpiar flotados*/}
                        <div className="clearfix"></div>
                    </article>
                );
            });

            return (
                <div id="articles">
                    {listArticles}
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status == 'success') {
            return (
                <div id="articles">
                    <h2 className='subheader'>NO hay articulos para mostrar</h2>
                    <p>todavia no hay contenido en este seccion</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className='subheader'>Cargando...</h2>
                    <p>espere un segundo</p>
                </div>
            );
        }

    };
}

export default Articles;