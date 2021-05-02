import React from 'react'
import "./SongsPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import {SongsMockData} from "./SongsMockData";
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5";

function UploadSongPage(props) {
    return (
        <Modal
        className = "ModalPage"
        {...props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className = "header">
            <IoClose className = "close" size={30} onClick={props.onHide}/>
            <Modal.Title>
                <h4>{props.title}</h4> 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <p>
                    Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text"/>
                </p>
                <p>
                    Musician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text"/>
                </p>
                <p>
                    Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text"/>
                </p>
                <p>
                    Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "number" min="1900"/>
                </p>
                <p>
                    Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "number" min="1" step="any"/>
                </p>
                <p>
                    Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "number" min="0"/>
                </p>
                <p>
                    Youtube Link&nbsp;:&nbsp;
                    <input type = "url"/>
                </p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                        id="song"
                        accept="audio/*"/>
                </p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                        id="photo"
                        accept="image/*"/>
                </p>
                <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET"></input>                
          </form>

        </Modal.Body>
      </Modal>
    )
}

function SongsPage() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
       const results = SongsMockData.filter(song =>
         song.title.toLocaleLowerCase().includes(searchTerm)
       );
       setSearchResults(results);
     }, [searchTerm]);
     const [modalShow, setModalShow] = React.useState(false);

    return (
    <React.Fragment>
        <Sidebar/>
        <Topbar/>
        <div className = "SongsPage">
            <button className = "UploadButton" onClick={() => setModalShow(true)}>UPLOAD</button>
            <UploadSongPage
                show={modalShow}
                onHide={() => setModalShow(false)}
                title = "UPLOAD SONG"
            />
            <input 
                className = "SearchBar" 
                type = "search" 
                placeholder = "Search a song .."
                value = {searchTerm}
                onChange = {handleChange}
            />
            <div className = "List">
                <ul>
                    {searchResults.map((song, index) => (
                        <li className="row" key={index}>
                            {song.photo}
                            <p className = "title"><b>{song.title}</b><br/><a className = "musician">by {song.musician}</a></p>
                            <p className = "items">Price: {song.price}<br/> Quantity: {song.quantity}</p>
                            <p className = "items">Last edited<br/>{song.time}</p>
                            <button><u>EDIT</u></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </React.Fragment>

    )
}

export default SongsPage
