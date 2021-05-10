import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import "./SongsPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import sound from './10.mp3';
import afterone from './red.mp3';
import immmmag from './kwaiva_logo_sample.png';

function UploadSongPage(props) {
    return (
        <Modal
            className="ModalPage"
            {...props}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="header">
                <IoClose className="close" size={30} onClick={props.onHide} />
                <Modal.Title>
                    <h4>{props.title}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <p>
                        Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" id="input_title" />
                    </p>
                    <p>
                        Musician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" />
                    </p>
                    <p>
                        Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" />
                    </p>
                    <p>
                        Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1900" />
                    </p>
                    <p>
                        Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1" step="any" />
                    </p>
                    <p>
                        Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="0" />
                    </p>
                    <p>
                        Youtube Link&nbsp;:&nbsp;
                    <input type="url" />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                            id="song"
                            accept="audio/*" />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                            id="photo"
                            accept="image/*" />
                    </p>
                    <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET"></input>
                </form>

            </Modal.Body>
        </Modal>
    )
}
const handleSubmit = ((event) => {
    event.preventDefault()
    console.log("connect")
    console.log(event)
    let formData = new FormData(event.target)
    console.log(event.target)
    Axios.post("http://localhost:3001/getform", formData).then(() => {
        alert("successful update");
    });
});


function SongsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // const [afterUnblobed, setAfterUnblobed] = useState(sound)
    const [badge, setBadge] = useState(afterone);
    const [selectetdFile, setSelectedFile] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };


    function ImageToBase64(img, mime_type) {
        // New Canvas
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        // Draw Image
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // To Base64
        return canvas.toDataURL(mime_type);
    }
    const [fileBase64String, setFileBase64String] = useState("");

    const encodeFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                var Base64 = reader.result;
                console.log(Base64);
                setFileBase64String(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };
    const decodeFileBase64 = (base64String) => {
        // From Bytestream to Percent-encoding to Original string
        return decodeURIComponent(
            atob(base64String)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
    };



    useEffect(() => {
        Axios.get('http://localhost:3001/songs/get').then((response) => {
            var data = response.data;
            // console.log(data)
            const results = data.map(song =>
                song
            );

            setSearchResults(results);

            encodeFileBase64(selectetdFile[0]);
            console.log(fileBase64String);

            const decodeBase64 = decodeFileBase64(
                fileBase64String.substring(fileBase64String.indexOf(",") + 1)
            );
            // console.log(results[0].photo);
            // var temp = Buffer.from(results[0].photo.data, "base64").toString('ascii');

            setBadge(decodeBase64);
            console.log(badge);
        })
    }, [])
    const onFileChange = (e) => {
        setSelectedFile(e.target.files);
        console.log(e.target.files[0]);
        console.log(e.target.files[0].name);
        console.log(e.target.files[0].size);
        console.log(e.target.files[0].type);
        encodeFileBase64(e.target.files[0]);
        console.log(fileBase64String);

        const decodeBase64 = decodeFileBase64(
            fileBase64String.substring(fileBase64String.indexOf(",") + 1)
        );
        // console.log(results[0].photo);
        // var temp = Buffer.from(results[0].photo.data, "base64").toString('ascii');

        setBadge(decodeBase64);
        console.log(badge);


    };
    // React.useEffect(() => {
    //     const results = SongsMockData.filter(song =>
    //         song.title.toLocaleLowerCase().includes(searchTerm)
    //     );
    //     setSearchResults(results);
    //     console.log(results)
    // }, [searchTerm]);

    const [modalShow, setModalShow] = useState(false);

    const [isPlay, setPlay] = useState(false);
    const [isPaues, setPause] = useState(false);

    var audio = document.getElementById("myAudio");

    const play = () => {
        audio.play();
        setPlay(true);
    };

    const pause = () => {
        audio.pause();
        setPlay(false);
    };


    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
        setPlay(false);
    };

    // const submit = () => {
    //     Axios.post("http://localhost:3001/testdata/insert", {
    //         changedtitled: 'testets',
    //     }).then(() => {
    //         alert("successful update");
    //     })
    // }

    return (
        <React.Fragment>
            <Sidebar />
            <Topbar />
            <input type="file"
                id="photo"
                accept="image/*" onChange={onFileChange} />
            {/* <input type="file"
                id="song"
                accept="audio/*" onChange={onFileChange} /> */}
            <audio id="myAudio">
                <source src={badge} type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>
            <div className="SongsPage">
                <button className="UploadButton" onClick={() => setModalShow(true)}>UPLOAD</button>
                <UploadSongPage
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="UPLOAD SONG"
                />
                <input
                    className="SearchBar"
                    type="search"
                    placeholder="Search a song .."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <div className="List">
                    <img id="output" src='./kwaiva_logo_sample.png' />
                    <img id="imgclass" />
                    <ul>
                        {searchResults.map((song, index) => (
                            <li className="row" key={index}>
                                <img id="imgclass1" src={Buffer.from(song.photo.data, "base64").toString('ascii')} />
                                <p className="title"><b>{song.title}</b><br /><a className="musician">by {song.musician}</a></p>
                                <p className="items">Price: {song.price}<br /> Quantity: {song.quantity}</p>
                                <p className="items">Last edited<br />{song.created_at.slice(0, 10)}</p>
                                <button><u>EDIT</u></button>
                                <a className="audio">
                                    <div className="play" onClick={() => { isPlay ? pause() : play() }}>{isPlay ? <FaPause /> : <FaPlay />}</div>
                                    <div className="stop" onClick={() => stop()}><FaStop /></div>
                                </a>
                            </li>
                        ))}
                        {/* <button type="button" onClick={() => submit()}>Click Me!</button> */}
                    </ul>

                </div>
            </div>
        </React.Fragment>

    )
}

export default SongsPage
