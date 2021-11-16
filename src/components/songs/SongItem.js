import React from "react"
import {Link} from "react-router-dom";
import './Song.css'


export default class SongItem extends React.Component{
    constructor(props) {
        super(props);

            this.state={
                error:null,
                isLoad:true,
                item: props.songItem

            }


    }


    render() {
        if (!this.state.isLoad) return this.renderLoad();
        if (this.state.error) return this.renderError();
        return this.renderData();
    }

    renderData(){
        return(
        <div className="col col-10 col-md-6 col-xl-4">
            <div className="card mb-3" >
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.item.header_image_thumbnail_url} className="img-fluid rounded-start" alt="Изображение для песни"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <Link to={`/aboutSong/${this.state.item.id}`} >
                                <h5 className="card-title"> {this.state.item.title}</h5>
                            </Link>
                            <p className="card-text">{this.state.item.primary_artist.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }

    renderLoad(){
        return (
            <div className="position-absolute top-50 start-50">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    // Вывод состояния ошибки
    renderError(){
        return (
            <div className="position-absolute top-50 start-50">
                <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
            </div>
        )
    }
}
