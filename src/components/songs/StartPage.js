import React from "react";
import './Song.css'
import {Link} from "react-router-dom";

class StartPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            searchParam:""
        }
    }
    render() {
        return(
            <div className="container mySize">
                <div className="row justify-content-center">
                    <div className="col-8 text-center">
                        <img className="myImg" src="bestFunkAlbums.jpg" alt="image funk album"/>
                    </div>
                    <div className="col-8 mt-3 text-center">
                        <input type="text" name="searchParam" id="findRow" onBlur={this.getSearchParam.bind(this)}/>
                        <Link to={`/${this.state.searchParam}`}><button type="button">Начать поиск</button></Link>
                    </div>
                </div>
                <footer>
                    <div className="row mySize justify-content-center">
                        <div className="col-8 topBorder ">
                            <small>Узнай больше о своей любимой песне</small>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
    getSearchParam(el) {
        const sparam = el.target.value;
        console.log(sparam);
        this.setState({
            searchParam: sparam
        })

    }
}
export default StartPage;