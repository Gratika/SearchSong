import React from "react"
import SongItem from "./SongItem";
export default class SongsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            error: false,
            res: [],
            searchParam: this.props.searchParam,
            title: ""
        }
    }
    componentDidMount() {
        this.getResult();
    }

    render(){
        if (!this.state.isLoad) return this.renderLoad();
        if (this.state.error) return this.renderError();
        return this.renderData();
    }

    renderData(){
        return(
            <div>
                <header>
                    <div className="container">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                   onBlur={this.getSearchParam.bind(this)} defaultValue={this.state.searchParam}/>
                            <button className="btn btn-outline-success" type="button"
                                    onClick={this.getResult.bind(this)}>Search
                            </button>
                        </form>
                    </div>

                </header>
                 <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>{this.state.title}</h1>
                        </div>
                        {this.state.res.map(function(item){
                            return (<SongItem key = {item.id} songItem = {item}/>)
                        })
                        }

                    </div>

                </div>

            </div>
        )
    }
    renderLoad(){
        return(
            <div className="position-absolute top-50 start-50">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        )
    }
    renderError(){
        return (
            <div className="position-absolute top-50 start-50">
                <div className="alert alert-danger" role="alert">
                    {this.state.title}
                </div>
            </div>

        )
    }
    getResult() {
        let getParam = this.state.searchParam;
        if (getParam === "") {
            this.setState({
                title: "Введите поисковый запрос!",
                error: true

            });
            return;
        }

        this.setState({
            isLoad: false,
            error: false
        })
        fetch("https://genius.p.rapidapi.com/search?q="+getParam, {
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
                this.createSongList(data["response"]["hits"]);
                console.log(this.state.res);
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    error: true,
                    title: err,
                    isLoad: true

                })
            });

    }

    getSearchParam(el) {
        const sparam = el.target.value;
        console.log(sparam);
        this.setState({
            error: false,
            title: "",
            searchParam: sparam
        })

    }

    createSongList(songData) {
        let songList = [];
        console.log(songData);
        songData.forEach(function (item){
            if (item["type"] === "song") {
                songList.push(item["result"]);
            }

        });
        this.setState({
            error: false,
            res: songList,
            title: "Результаты поиска",
            isLoad: true
        })
    }



}