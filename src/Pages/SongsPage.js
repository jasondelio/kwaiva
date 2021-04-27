import React from 'react'
import "./SongsPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import {SongsMockData} from "./SongsMockData";

function SongsPage() {
    return (
    <React.Fragment>
        <Sidebar/>
        <Topbar/>
        <div className = "SongsPage">
            <button className = "UploadButton">UPLOAD</button>
            <input className = "SearchBar" type = "search" placeholder = "Search a song .."/>
            <div className = "List">
                <ul>
                    {SongsMockData.map((song, index) => (
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
