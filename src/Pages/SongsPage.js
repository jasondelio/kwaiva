import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const [values, setValues] = useState({
        title: "",
        musician: "",
        genre: "",
        year: 0,
        price: 0,
        quantity: 0,
        urlYoutube: "",
    });

    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(values)
        setValues({ ...values, [name]: value });
    }

    const [musicFile, setMusicFile] = useState("");
    const [imageFile, setImageFile] = useState("");

    function handleMusicFileChange(e) {
        console.log(e.target.files[0]);

        encodeMusicFileBase64(e.target.files[0]);
        console.log(musicFile);
    }
    function handleImageFileChange(e) {
        console.log(e.target.files[0]);
        encodeImageFileBase64(e.target.files[0]);
        console.log(imageFile);
    }

    const encodeMusicFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                var Base64 = reader.result;
                console.log(Base64);
                setMusicFile(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };
    const encodeImageFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                var Base64 = reader.result;
                console.log(Base64);
                setImageFile(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };

    const handleSubmit = ((event) => {
        event.preventDefault()
        console.log("connect")
        console.log(event)
        let formData = new FormData()
        for (var key in values) {
            formData.append(key, values[key]);
        }
        console.log(formData)
        formData.append('musicfile', musicFile);
        formData.append('imagefile', imageFile);
        Axios({
            method: "post",
            url: "http://localhost:3001/getform",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        // event.props.onHide();
        setValues({
            title: "",
            musician: "",
            genre: "",
            year: 0,
            price: 0,
            quantity: 0,
            urlYoutube: "",
        });
        history.push({ pathname: 'songs' });
    });

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
                <form onSubmit={(e) => { handleSubmit(e); props.onHide(); }}>
                    <p>
                        Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="title" defaultValue={values.title} onChange={handleInputChange} />
                    </p>
                    <p>
                        Musician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="musician" defaultValue={values.musician} onChange={handleInputChange} />
                    </p>
                    <p>
                        Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="genre" defaultValue={values.genre} onChange={handleInputChange} />
                    </p>
                    <p>
                        Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1900" name="year" defaultValue={values.year} onChange={handleInputChange} />
                    </p>
                    <p>
                        Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1" step="any" name="price" defaultValue={values.price} onChange={handleInputChange} />
                    </p>
                    <p>
                        Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="0" name="quantity" defaultValue={values.quantity} onChange={handleInputChange} />
                    </p>
                    <p>
                        Youtube Link&nbsp;:&nbsp;
                    <input type="url" name="urlYoutube" defaultValue={values.urlYoutube} onChange={handleInputChange} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                            id="song"
                            accept="audio/*"
                            name="musicfile" defaultValue={values.musicfile} onChange={(e) => handleMusicFileChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                            id="photo"
                            accept="image/*"
                            name="imagefile" defaultValue={values.imagefile} onChange={(e) => handleImageFileChange(e)} />
                    </p>
                    <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET"></input>
                </form>

            </Modal.Body>
        </Modal>
    )
}

function EditSongPage(props) {
    const history = useHistory();

    const handleDelete = ((event) => {
        event.preventDefault()
        console.log("connect")
        console.log(event)
        let formData = new FormData()
        formData.append('song_id', props.songData.song_id);
        console.log(formData.entries().next())
        Axios({
            method: "post",
            url: "http://localhost:3001/deletesong",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        // event.props.onHide();
        setValues({
            id: 0,
            title: "",
            musician: "",
            genre: "",
            year: 0,
            price: 0,
            quantity: 0,
            urlYoutube: "",
        });
        history.push({ pathname: 'songs' });
    });

    const [setsResult, setSearchResults] = useState([]);


    // [props.index
    const [values, setValues] = useState({
        id: props.songData.song_id,
        title: props.songData.title,
        musician: props.songData.musician,
        genre: props.songData.genre,
        year: 1900,
        price: props.songData.price,
        quantity: props.songData.quantity,
        urlYoutube: "",
    });



    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(values)
        setValues({ ...values, [name]: value });
    }

    const [musicFile, setMusicFile] = useState("");
    const [imageFile, setImageFile] = useState("");

    function handleMusicFileChange(e) {
        console.log(e.target.files[0]);

        encodeMusicFileBase64(e.target.files[0]);
        console.log(musicFile);
    }
    function handleImageFileChange(e) {
        console.log(e.target.files[0]);
        encodeImageFileBase64(e.target.files[0]);
        console.log(imageFile);
    }

    const encodeMusicFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                var Base64 = reader.result;
                console.log(Base64);
                setMusicFile(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };
    const encodeImageFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                var Base64 = reader.result;
                console.log(Base64);
                setImageFile(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };

    const handleSubmit = ((event) => {
        event.preventDefault()
        console.log("connect")
        console.log(event)
        let formData = new FormData()
        for (var key in values) {
            formData.append(key, values[key]);
        }
        console.log(formData)
        formData.append('musicfile', musicFile);
        formData.append('imagefile', imageFile);
        Axios({
            method: "post",
            url: "http://localhost:3001/getform",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        event.props.onHide();
        setValues({
            title: "",
            musician: "",
            genre: "",
            year: 0,
            price: 0,
            quantity: 0,
            urlYoutube: "",
        });
        history.push({ pathname: 'songs' });
    });

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
                <form onSubmit={(e) => { handleSubmit(e); props.onHide(); }}>
                    <p>
                        Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="title" defaultValue={values.title} onChange={handleInputChange} />
                    </p>
                    <p>
                        Musician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="musician" defaultValue={values.musician} onChange={handleInputChange} />
                    </p>
                    <p>
                        Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="genre" defaultValue={values.genre} onChange={handleInputChange} />
                    </p>
                    <p>
                        Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1900" name="year" defaultValue={values.year} onChange={handleInputChange} />
                    </p>
                    <p>
                        Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1" step="any" name="price" defaultValue={values.price} onChange={handleInputChange} />
                    </p>
                    <p>
                        Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="0" name="quantity" defaultValue={values.quantity} onChange={handleInputChange} />
                    </p>
                    <p>
                        Youtube Link&nbsp;:&nbsp;
                    <input type="url" name="urlYoutube" defaultValue={values.urlYoutube} onChange={handleInputChange} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                            id="song"
                            accept="audio/*"
                            name="musicfile" defaultValue={values.musicfile} onChange={(e) => handleMusicFileChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                            id="photo"
                            accept="image/*"
                            name="imagefile" defaultValue={values.imagefile} onChange={(e) => handleImageFileChange(e)} />
                    </p>
                    <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET"></input>
                    <input type="delete" value="DELTE" onClick={(e) => { handleDelete(e); props.onHide(); }}></input>
                </form>

            </Modal.Body>
        </Modal >
    )
}



function SongsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // const [afterUnblobed, setAfterUnblobed] = useState(sound)
    const [badge, setBadge] = useState(afterone);
    const [fileBase64String, setFileBase64String] = useState("");

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

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
            const results = data.map(song =>
                song
            );
            console.log(results)
            setSearchResults(results);
            console.log(fileBase64String);
            console.log(data);
            // var temp = Buffer.from(results[0].photo.data, "base64").toString('ascii');
        })
    }, [])

    const onFileChange = (e) => {
        // setSelectedFile(e.target.files);
        // console.log(e.target.files[0]);
        // console.log(e.target.files[0].name);
        // console.log(e.target.files[0].size);
        // console.log(e.target.files[0].type);
        // encodeFileBase64(e.target.files[0]);
        // console.log(fileBase64String);

        // console.log(results[0].photo);
        // var temp = Buffer.from(results[0].photo.data, "base64").toString('ascii');

    };
    const handleEditButton = ((paraId) => {
        var formData1 = new FormData()
        formData1.append('songID', 2);
        // console.log(formData.entries)

        Axios({
            method: "GET",
            url: "http://localhost:3001/songs/getid",
            params: { songID: paraId },
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                var data = response.data;
                setSelectedSong(data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    })

    const [selectedSong, setSelectedSong] = useState([]);

    const [modalShow, setModalShow] = useState(false);
    const [modalUpdateShow, setModalUpdateShow] = useState(false);
    const [isPlay, setPlay] = useState(false);

    const play = (param_audio) => {
        var audio = document.getElementById('myAudio');

        var source = document.getElementById('audioSource');
        audio.src = param_audio;

        audio.play(); //call this to play the song right away
        setPlay(true);
    };

    const pause = () => {
        var audio = document.getElementById('myAudio');
        audio.pause();
        setPlay(false);
    };


    const stop = () => {
        var audio = document.getElementById('myAudio');
        audio.pause();
        audio.currentTime = 0;
        setPlay(false);
    };

    return (
        <React.Fragment>
            <Sidebar />
            <Topbar />
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
                    <ul>
                        {searchResults.map((song, index) => (
                            <li className="row" key={index}>
                                <audio id="myAudio">
                                    <source id="audioSource" src="" type="audio/ogg" />
                                </audio>
                                <img id="imgclass1" src={Buffer.from(song.photo.data, "base64").toString('ascii')} />
                                <p className="title"><b>{song.title}</b><br /><a className="musician">by {song.musician}</a></p>
                                <p className="items">Price: {song.price}<br /> Quantity: {song.quantity}</p>
                                <p className="items">Last edited<br />{song.created_at.slice(0, 10)}</p>
                                <button className="UploadButton" onClick={() => { handleEditButton(song.song_id); setModalUpdateShow(true) }}>EDIT</button>
                                <EditSongPage
                                    show={modalUpdateShow}
                                    onHide={() => setModalUpdateShow(false)}
                                    title="EDIT SONG"
                                    songData={song}
                                />
                                <a className="audio">
                                    <div className="play" onClick={() => { isPlay ? pause() : play(Buffer.from(song.music.data, "base64").toString('ascii')) }}>{isPlay ? <FaPause /> : <FaPlay />}</div>
                                    <div className="stop" onClick={() => stop()}><FaStop /></div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>

    )
}

export default SongsPage
