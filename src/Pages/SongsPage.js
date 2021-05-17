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
                var Base64 = reader.result;
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
                var Base64 = reader.result;
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
                history.go(0);
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
    });

    return (
        <Modal
            className="ModalPageSong"
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
        console.log("handle delete")
        console.log(event)
        let formData = new FormData()
        formData.append('song_id', props.songdata[0].song_id);
        console.log(formData.entries().next())
        Axios({
            method: "post",
            url: "http://localhost:3001/deletesong",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            console.log(response);
            history.go(0);
        }).catch(function (response) {
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
    // console.log("Child");
    // console.log(props.songid)
    // console.log(props.songdata)

    const [values, setValues] = useState({
        id: props.songdata[0].song_id,
        title: props.songdata[0].title,
        musician: props.songdata[0].musician,
        genre: props.songdata[0].gender,
        year: parseInt(props.songdata[0].created_at.slice(0, 4)),
        price: props.songdata[0].price,
        quantity: props.songdata[0].quantity,
        urlYoutube: props.songdata[0].youtubelink,
    });

    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        // console.log(values)
        setValues({ ...values, [name]: value });
    }

    const [musicFile, setMusicFile] = useState(Buffer.from(props.songdata[0].music, "base64").toString('ascii'));
    const [imageFile, setImageFile] = useState(Buffer.from(props.songdata[0].photo, "base64").toString('ascii'));

    function handleMusicFileChange(e) {
        encodeMusicFileBase64(e.target.files[0]);
    }
    function handleImageFileChange(e) {
        encodeImageFileBase64(e.target.files[0]);
    }

    const encodeMusicFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result;
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
                var Base64 = reader.result;
                setImageFile(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };

    const handleSubmit = ((event) => {
        event.preventDefault()
        console.log("handle Submit")
        console.log(event)
        let formData = new FormData()
        for (var key in values) {
            formData.append(key, values[key]);
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        if (imageFile === props.songdata[0].photo) {
            console.log("same")
        } else {
            console.log("different")
        }
        formData.append('musicfile', musicFile);
        formData.append('imagefile', imageFile);

        Axios({
            method: "post",
            url: "http://localhost:3001/song/update",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            console.log(response);
            history.go(0);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });

        setValues({
            title: "",
            musician: "",
            genre: "",
            year: 0,
            price: 0,
            quantity: 0,
            urlYoutube: "",
        });
    });

    return (
        <Modal
            className="ModalPageSong"
            {...props}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="header">
                <IoClose className="close" size={30} onClick={() => { history.go(0); }} />
                <Modal.Title>
                    <h4>{props.title}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => { handleSubmit(e); }}>
                    <p>
                        Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="title" defaultValue={values.title} onChange={(e) => handleInputChange(e)} />
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
                    <input type="url" name="urlYoutube" defaultValue={values.urlYoutube} onChange={(e) => handleInputChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                            accept="audio/*"
                            name="musicfile" onChange={(e) => handleMusicFileChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                            accept="image/*"
                            name="imagefile" onChange={(e) => handleImageFileChange(e)} />
                    </p>
                    <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="reset" value="RESET"></input>
                    <p><button onClick={(e) => { handleDelete(e); }}>DELETE</button></p>
                </form>

            </Modal.Body>
        </Modal >
    )
}

function SongsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [originResults, setOriginResults] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalUpdateShow, setModalUpdateShow] = useState(false);
    const [isPlay, setPlay] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlayList, setPlayList] = useState([]);
    const [useId, setID] = useState(0);
    const [iniSrcMusic, setIniSrcMusic] = useState("");
    const [selectedSong, setSelectedSong] = useState([{
        song_id: 0,
        title: "",
        musician: "",
        genre: "",
        price: 0,
        quantity: 0,
    }]);

    // const handleChange = event => {
    //     setSearchTerm(event.target.value);
    // };

    useEffect(() => {
        Axios.get('http://localhost:3001/songs/get').then((response) => {
            var data = response.data;
            const results = data.map(song =>
                song
            );
            // var sa = results.find((so) => so.song_id === 2)
            // console.log(results)
            setSearchResults(results);
            setOriginResults(results);
            var createlist = []
            for (var i = 0; i < results.length; i++) {
                createlist.push(false);
            }
            setPlayList(createlist);
            setIsLoading(false);
            // var temp = Buffer.from(results[0].photo.data, "base64").toString('ascii');
        })
    }, [])

    function handleChangeSearch(e) {
        const target = e.target;
        const value = target.value;
        setSearchTerm(value);
        console.log(value)
        if (value === "") {
            setSearchResults(originResults);
        }
        else {
            const results = originResults.filter(song =>
                song.title.toLocaleLowerCase().includes(value)
            );
            setSearchResults(results);
        }
    }

    const handleEditButton = ((paraId) => {
        var formData1 = new FormData()
        formData1.append('songID', paraId);
        Axios({
            method: "GET",
            url: "http://localhost:3001/songs/getid",
            params: { songID: paraId },
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            var data = response.data;
            setSelectedSong(data);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
    })

    const handlePlay = (param_audio, index) => {
        setIsShow(true);
        setIniSrcMusic(param_audio);
    }

    // const play = (param_audio, index) => {
    //     var audio = document.getElementById('myAudio');
    //     console.log(audio);
    //     audio.src = param_audio;
    //     console.log(audio.src)
    //     audio.play();
    //     var createlist = []
    //     for (var i = 0; i < searchResults.length; i++) {
    //         createlist.push(false);
    //     }
    //     createlist[index] = true
    //     console.log(createlist)
    //     console.log(index)

    //     setPlayList(createlist);
    // };

    // const pause = (index) => {
    //     var audio = document.getElementById('myAudio');
    //     audio.pause();
    //     // setPlay(false);
    //     var createlist = []
    //     for (var i = 0; i < searchResults.length; i++) {
    //         createlist.push(false);
    //     }
    //     setPlayList(createlist)
    // };

    const stop = (index) => {
        var audio = document.getElementById('myAudio');
        audio.pause();
        audio.currentTime = 0;
        var createlist = []
        for (var i = 0; i < searchResults.length; i++) {
            createlist.push(false);
        }
        console.log(createlist)
        setPlayList(createlist)
        setIsShow(false);
    };

    return (
        <React.Fragment>
            {isLoading ?
                <div></div>
                :
                <div>
                    <Sidebar />
                    <Topbar />
                    <div className="SongsPage">
                        <button className="UploadButton" onClick={() => setModalShow(true)}>UPLOAD</button>
                        {modalShow ? <UploadSongPage
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            title="UPLOAD SONG"
                        /> : <div />}
                        <input
                            className="SearchBar"
                            type="search"
                            placeholder="Search a song .."
                            value={searchTerm}
                            onChange={(e) => handleChangeSearch(e)}
                        />
                        <div className="List">
                            <ul>
                                {searchResults.map((song, index) => (
                                    <li className="row" key={index} onClick={() => { setIniSrcMusic(Buffer.from(song.music.data, "base64").toString('ascii')); handlePlay(Buffer.from(song.music.data, "base64").toString('ascii'), index) }}>
                                        <img id="imgclass1" src={Buffer.from(song.photo.data, "base64").toString('ascii')} />
                                        <p className="title"><b>{song.title}</b><br /><a className="musician">by {song.musician}</a></p>
                                        <p className="items">Price: {song.price}<br /> Quantity: {song.quantity}</p>
                                        <p className="items">Last edited<br />{song.created_at.slice(0, 10)}</p>
                                        <button className="UploadButton" onClick={() => { setID(song.song_id); handleEditButton(song.song_id); setModalUpdateShow(true) }}>EDIT</button>
                                        {modalUpdateShow ? <EditSongPage
                                            show={modalUpdateShow}
                                            onHide={() => setModalUpdateShow(false)}
                                            title="EDIT SONG"
                                            songdata={[searchResults.find((so) => so.song_id === useId)]}
                                            songid={index}
                                        /> : <div />}
                                        {/* <a className="audio">
                                            <div className="play" onClick={() => { setIniSrcMusic(Buffer.from(song.music.data, "base64").toString('ascii')); handlePlay(Buffer.from(song.music.data, "base64").toString('ascii'), index) }}><FaPlay /></div>
                                            <div className="stop" onClick={() => stop(index)}><FaStop /></div>
                                        </a> */}
                                    </li>
                                ))}
                            </ul>
                            {isShow ?
                                <div className='audioplayer'>
                                    <audio controls id='myAudio' controlsList="nodownload" src={iniSrcMusic} style={{ width: "50%" }}>
                                        <source id="audioSource" type="audio/ogg" />
                                    </audio>
                                    <div className="stop" onClick={() => stop()}><IoClose /></div>
                                </div>
                                :
                                <div />
                            }
                        </div>

                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default SongsPage
