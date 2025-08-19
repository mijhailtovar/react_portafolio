import React, { Component } from "react";
import Slider from './Slider'
import Sidebar from './Sidebar'
import Articles from "./Articles";

class Blog extends Component {

    render() {

        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className='center'>
                    <div id="content">
                        {/**listado de articulos que vendran del api rest de node */}

                        <Articles />
                        
                    </div>
                </div> {/**End div Center */}

                <Sidebar
                    blog="true"
                />
            </div>
        );
    }
}

export default Blog;