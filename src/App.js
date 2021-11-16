
import './App.css';

import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import AboutSong from "./components/songs/AboutSong";
import StartPage from "./components/songs/StartPage";
import SongsList from "./components/songs/SongList";



function App() {
  return (
      <div className="app">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element= { <StartPage/>}></Route>
                  <Route path="/:search" element= { <GoSearch/>}></Route>
                  <Route path="aboutSong/:id" element = { <GoSong />}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}
function GoSong(){
    let {id} = useParams()
    return(
        <>
            <AboutSong soungId={id}/>
        </>
    );
}
function GoSearch(){
    let {search} = useParams()
    return(
        <>
            <SongsList searchParam={search}/>
        </>
    );
}

export default App;
