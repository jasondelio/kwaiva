import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./SongsPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5";

function UploadSongPage(props) {
    const history = useHistory();
    const [values, setValues] = useState({
        title: "",
        musician: "",
        genre: "",
        year: 1900,
        price: 0,
        quantity: 0,
        urlYoutube: "",
    });

    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    }

    const [musicFile, setMusicFile] = useState("");
    const [imageFile, setImageFile] = useState("");

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
        console.log("connect")
        let formData = new FormData()
        for (var key in values) {
            formData.append(key, values[key]);
        }
        formData.append('musicfile', musicFile);
        formData.append('imagefile', imageFile);

        var userConfirmation = window.confirm("Do you really want to update with this song?");

        if (userConfirmation) {
            Axios({
                method: "post",
                url: "http://localhost:3001/getform",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                history.go(0);
                event.props.onHide();

                setValues({
                    title: "",
                    musician: "",
                    genre: "",
                    year: 1900,
                    price: 0,
                    quantity: 0,
                    urlYoutube: "",
                });
            }).catch(function (response) {
                console.log(response);
            });
        }
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
                <form onSubmit={(e) => { handleSubmit(e); }}>
                    <p>
                        Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="title" required="required" defaultValue={values.title} onChange={handleInputChange} />
                    </p>
                    <p>
                        Musician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="musician" required="required" defaultValue={values.musician} onChange={handleInputChange} />
                    </p>
                    <p>
                        Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="genre" required="required" defaultValue={values.genre} onChange={handleInputChange} />
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
                    <input type="url" name="urlYoutube" required="required" defaultValue={values.urlYoutube} onChange={handleInputChange} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                            id="song"
                            accept="audio/*"
                            required="required"
                            name="musicfile" defaultValue={values.musicfile} onChange={(e) => handleMusicFileChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                            id="photo"
                            required="required"
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
        let formData = new FormData()
        formData.append('song_id', props.songdata[0].song_id);

        var userConfirmation = window.confirm("Do you really want to delete this song?");

        if (userConfirmation) {
            Axios({
                method: "post",
                url: "http://localhost:3001/deletesong",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                //handle success
                history.go(0);
                setValues({
                    id: 0,
                    title: "",
                    musician: "",
                    genre: "",
                    year: 1900,
                    price: 0,
                    quantity: 0,
                    urlYoutube: "",
                });
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
        }
    });

    const [values, setValues] = useState({
        id: props.songdata[0].song_id,
        title: props.songdata[0].title,
        musician: props.songdata[0].musician,
        genre: props.songdata[0].genre,
        year: props.songdata[0].release_year,
        price: props.songdata[0].price,
        quantity: props.songdata[0].quantity,
        urlYoutube: props.songdata[0].youtubelink,
    });

    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    }

    const [musicFile, setMusicFile] = useState(props.musicdata);
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

        let formData = new FormData()
        for (var key in values) {
            formData.append(key, values[key]);
        }

        if (imageFile === props.songdata[0].photo) {
            console.log("same")
        } else {
            console.log("different")
        }
        formData.append('musicfile', musicFile);
        formData.append('imagefile', imageFile);

        var userConfirmation = window.confirm("Do you really want to update this song?");

        if (userConfirmation) {
            Axios({
                method: "post",
                url: "http://localhost:3001/song/update",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                //handle success
                history.go(0);
                setValues({
                    title: "",
                    musician: "",
                    genre: "",
                    year: 1900,
                    price: 0,
                    quantity: 0,
                    urlYoutube: "",
                });
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
        }
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
                    <input type="text" name="title" defaultValue={values.title} required="required" onChange={(e) => handleInputChange(e)} />
                    </p>
                    <p>
                        Musician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="musician" defaultValue={values.musician} required="required" onChange={handleInputChange} />
                    </p>
                    <p>
                        Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="text" name="genre" defaultValue={values.genre} required="required" onChange={handleInputChange} />
                    </p>
                    <p>
                        Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1900" name="year" defaultValue={values.year} required="required" onChange={handleInputChange} />
                    </p>
                    <p>
                        Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="1" step="any" name="price" defaultValue={values.price} required="required" onChange={handleInputChange} />
                    </p>
                    <p>
                        Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type="number" min="0" name="quantity" defaultValue={values.quantity} required="required" onChange={handleInputChange} />
                    </p>
                    <p>
                        Youtube Link&nbsp;:&nbsp;
                    <input type="url" name="urlYoutube" defaultValue={values.urlYoutube} required="required" onChange={(e) => handleInputChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Song File&nbsp;:&nbsp;
                    <input type="file"
                            accept="audio/*"
                            name="musicfile"
                            onChange={(e) => handleMusicFileChange(e)} />
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo File&nbsp;:&nbsp;
                    <input type="file"
                            accept="image/*"
                            name="imagefile"
                            onChange={(e) => handleImageFileChange(e)} />
                    </p>
                    <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={(e) => { handleDelete(e); }}>DELETE</button>
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
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [useId, setID] = useState(0);
    const [iniSrcMusic, setIniSrcMusic] = useState("");
    const [selectedSong, setSelectedSong] = useState("")


    useEffect(() => {
        Axios.get('http://localhost:3001/songs/get').then((response) => {
            var data = response.data;
            const results = data.map(song =>
                song
            );
            setSearchResults(results);
            setOriginResults(results);
            var createlist = []
            for (var i = 0; i < results.length; i++) {
                createlist.push(false);
            }
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
    }, [modalUpdateShow])

    function handleChangeSearch(e) {
        const target = e.target;
        const value = target.value;
        setSearchTerm(value);
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

    const handleEditButton = ((paraId, play_or_edit) => {
        Axios({
            method: "GET",
            url: "http://localhost:3001/songs/getsong",
            params: { songID: paraId },
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            var data = response.data;
            if (play_or_edit === "play") {
                setIsShow(true);
                setIniSrcMusic(Buffer.from(data[0].music.data, "base64").toString('ascii'));
            }
            else {
                setSelectedSong(Buffer.from(data[0].music.data, "base64").toString('ascii'));
                setModalUpdateShow(true)
            }
        }).catch(function (response) {
            console.log(response);
        });
    })

    const stop = (index) => {
        var audio = document.getElementById('myAudio');
        audio.pause();
        audio.currentTime = 0;
        var createlist = []
        for (var i = 0; i < searchResults.length; i++) {
            createlist.push(false);
        }

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
                                    <li className="row" key={index} onClick={() => { handleEditButton(song.song_id, "play"); }}>
                                        <img id="imgclass1" alt="song_img" src={Buffer.from(song.photo.data, "base64").toString('ascii')} />
                                        <p className="title"><b>{song.title}</b><br /><p className="musician">By {song.musician}</p></p>
                                        <p className="items">Price: {song.price}<br /> Quantity: {song.quantity}</p>
                                        <p className="items">Last edited<br />{song.created_at}</p>
                                        <button className="UploadButton" onClick={() => { setID(song.song_id); handleEditButton(song.song_id, "edit"); }}>EDIT</button>
                                        {modalUpdateShow ? <EditSongPage
                                            show={modalUpdateShow}
                                            onHide={() => setModalUpdateShow(false)}
                                            title="EDIT SONG"
                                            songdata={[searchResults.find((so) => so.song_id === useId)]}
                                            songid={index}
                                            musicdata={selectedSong}
                                        /> : <div />}
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
