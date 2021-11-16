import React from "react"
import SongItem from "./SongItem";

export default class AboutSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            error: false,
            song: {}
        };


    }

    componentDidMount() {
        this.getSong();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.soungId!==prevProps.soungId){
            this.getSong();
        }
    }


    render() {
        if (!this.state.isLoad) return this.renderLoad();
        if (this.state.error) return this.renderError();
        return this.renderData();
    }

    renderData() {
        return (
            <div className="container">
                <div className="row my-3 align-items-center justify-content-around">
                    <GetSongImage sng={this.state.song}/>
                    <div className="col col-8">
                        <h1>{this.state.song.full_title}</h1>
                        <GetAlbum sng={this.state.song}/>
                        <GetArtist sng={this.state.song}/>
                        <div>
                            <span><b>Студия звукозаписи:</b> </span>
                            <span>
                                {this.state.song.recording_location}
                            </span>

                        </div>
                        <div>
                            <span><b>Дата выхода:</b> </span>
                            <span>
                                {this.state.song.release_date_for_display}
                            </span>

                        </div>
                        <div>
                            <span>
                                Больше информации о песне, включая ее текст вы найдете на сайте
                                <a href= {this.state.song.url}> Genius</a>
                            </span>

                        </div>
                        <GetMedia media={this.state.song.media}/>
                    </div>

                </div>
                <hr/>

                <GetRelationType relSongs={this.state.song.song_relationships}/>
            </div>

        )
    }


    renderLoad() {
        return (
            <div className="position-absolute top-50 start-50">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    // Вывод состояния ошибки
    renderError() {
        return (
            <div className="position-absolute top-50 start-50">
                <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
            </div>
        )
    }

    getSong() {
        fetch(`https://genius.p.rapidapi.com/songs/${this.props.soungId}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "genius.p.rapidapi.com",
                "x-rapidapi-key": "8dcb0b7475mshfa8d3ae4cf962b1p1d0dbbjsn4029c6b6e096"
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    this.setState({
                        error: true,
                        title: response.statusText,
                        isLoad: true

                    })
                }
                let resList = response.json();
                console.log(resList);
                return resList;


            })
            .then(data => {
                console.log(data['response']['song']);
                this.setState({
                    error: false,
                    isLoad: true,
                    song: data['response']['song']

                })
            })
            .catch(err => {
                console.error(err);
            });

    }
}
class GetMedia extends React.Component {
    render() {
        return (
            <div className="row mt-3">
                <div className="col col-3">
                    <h5>Медиа ссылки:</h5>
                </div>
                <div className="col col-6">
                    {this.props.media.map(function (item) {
                        return (
                            <div key={item.provider}>
                                <span><a href={item.url}>{item.provider}</a></span>
                            </div>
                        )

                    })
                    }
                </div>

            </div>
        )
    }
}

class GetRelationType extends React.Component {
    render() {
        return (
            <div className="row mt-3">
                <h2>Где еще можно увидеть или услышать эту песню:</h2>
                {this.props.relSongs.map(function (item, index) {
                    if (item.songs.length > 0)
                        return (
                            <div key={index} className="col col-12 my-3 shadow-sm">
                                <h4 className="pt-3 ">{item.relationship_type}</h4>
                                <OtherSong key={item.relationship_type} sampl={item.songs}/>
                            </div>
                        )

                })
                }
            </div>
        )
    }
}

class OtherSong extends React.Component {
    render() {
        return (
            <div className="row  py-3 justify-content-start ">
                {this.props.sampl.map(function (item) {
                    return (
                        <SongItem key={item.id} songItem={item}/>
                    )
                })}
            </div>
        )


    }

}

class GetSongImage extends React.Component {
    render() {
        if (this.props.sng.song_art_image_url !== "")
            return (
                <div className="col col-3">
                    <img src={this.props.sng.song_art_image_url} className="img-fluid" alt="изображение к песне"/>
                </div>
            )
        else
            return (
                <div className="col col-3">
                    <img src={this.props.sng.header_image_url} className="img-fluid" alt="изображение к песне"/>
                </div>
            )


    }

}

class GetAlbum extends React.Component {
    render() {
        if (this.props.sng.album !== null)
            return (
                <div>
                    <span><b>Албом:</b> </span>
                    <span>
                                <a href={this.props.sng.album.url}>{this.props.sng.album.name}</a>
                            </span>

                </div>
            )
        else return (
            <div>
                <span><b>Албом:</b> </span>
                <span> - </span>

            </div>
        )
    }

}

class GetArtist extends React.Component {
    render() {
        if (this.props.sng.album !== null)
            return (
                <div>
                    <span> <b>Исполнитель:</b> </span>
                    <span>
                          <a href={this.props.sng.album.artist.url}>{this.props.sng.artist_names}</a>
                    </span>

                </div>
            )
        else return (
            <div>
                <span> <b>Исполнитель:</b> </span>
                <span>
                     {this.props.sng.artist_names}
                </span>

            </div>
        )

    }

}
