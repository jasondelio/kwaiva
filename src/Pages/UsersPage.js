import React, { useEffect, useState }  from 'react'
import "./UsersPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const hashPassword = (pass) => {
    var bcrypt = require('bcryptjs');
    const saltRounds = 10;
    var hash = bcrypt.hashSync(pass, saltRounds);

    return hash;
}

const compareHashed = (pass, hashed) => {
    var bcrypt = require('bcryptjs');
    var isSame = bcrypt.compareSync(pass, hashed);
    if (isSame) {
        return hashed;
    } else {
        return hashPassword(pass);
    }
}

function AddUserPage(props) {
    const history = useHistory();
    const [userInfo, setuserInfo] = React.useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = ((e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setuserInfo({ ...userInfo, [name]: value });
        console.log(userInfo)
    })
    

    const handleSubmit = ((event) => {
        event.preventDefault()
        console.log("connect")
        console.log(userInfo)
        
        // let formData = new FormData(userInfo)
        // console.log(userInfo)
        let Userdata = new FormData();

        for (var pair of Userdata.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }
        Userdata.append('firstName', userInfo.firstName);
        Userdata.append('lastName', userInfo.lastName);
        Userdata.append('userName', userInfo.userName);
        Userdata.append('email', userInfo.email);
        Userdata.append('password', hashPassword(userInfo.password));
        Userdata.append('role', userInfo.role);
        console.log(Userdata.get('firstName'))
        Axios({
            method: 'POST',
            url: "http://localhost:3001/users/insert",
            data: Userdata,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            console.log(response);

        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

        history.push('/users');
    });

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
            <form action="/users/insert" method="POST" onSubmit={(e) => handleSubmit(e)}>
            <p>
                    First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text" name="firstName" onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text" name="lastName" onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Username&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text" name="userName" onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "email" name="email" onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "password" name="password" onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <select id="role" name="role" onClick={e => handleChange(e)}>
                        <option value="admin" name="role" onClick={e => handleChange(e)}>Admin</option>
                        <option value="fans" name="role" onClick={e => handleChange(e)}>Fans</option>
                        <option value="musician" name="role" onClick={e => handleChange(e)}>Musician</option>
                    </select>
                </p>
                <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET"></input>
            </form>
        </Modal.Body>
      </Modal>
    )
}

function EditUserPage(props) {
    const [selectedData, setSelectedData] = useState({
        keyId: props.userData.keyId,
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        userName: props.userData.userName,
        email: props.userData.email,
        password: props.userData.password,
        role: props.userData.role
    });
    const handleChange = (e) => {

        const target = e.target;
        var values = target.value;
        const name = target.name;
        if(values === null) {
            values = `props.userData.${name}`;
        } else if (name === 'password') {
            var temp = compareHashed(values, `props.userData.${name}`);
        console.log(temp)

            values = temp;
        }
        setSelectedData({ ...selectedData, [name]: values });
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        let EditedUserdata = new FormData();

        for (var pair of EditedUserdata.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }
        EditedUserdata.append('firstName', selectedData.firstName);
        EditedUserdata.append('lastName', selectedData.lastName);
        EditedUserdata.append('userName', selectedData.userName);
        EditedUserdata.append('email', selectedData.email);
        EditedUserdata.append('password', selectedData.password);
        EditedUserdata.append('role', selectedData.role);
        EditedUserdata.append('keyId', props.userData.keyId);
        var server = 3001;
        Axios({
            method: 'POST',
            url: `http://localhost:${server}/users/update`,
            data: EditedUserdata,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            console.log(response);

        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    };

    return (
        <Modal
        className = "ModalPage"
        {...props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className = "header">
            <IoClose className = "close" size={30} onClick={() => props.onHide()}/>
            <Modal.Title>
                <h4>{props.title}</h4> 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="/users/update" method="POST" onSubmit={(e) => { handleSubmit(e); props.onHide();}}>
            <p>
                    First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text" name="firstName" defaultValue={selectedData.firstName} onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text" name="lastName" defaultValue={selectedData.lastName} onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Username&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text" name="userName" defaultValue={selectedData.userName} onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "email" name="email" defaultValue={selectedData.email} onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "password" name="password" defaultValue={selectedData.password} onChange={e => handleChange(e)}/>
                </p>
                <p>
                    Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <select id="role" name="role" onChange={e => handleChange(e)}>
                        <option value="admin" name="role" onChange={e => handleChange(e)}>Admin</option>
                        <option value="fans" name="role" onChange={e => handleChange(e)}>Fans</option>
                        <option value="musician" name="role" onChange={e => handleChange(e)}>Musician</option>
                    </select>
                </p>
                <button type="edit" value="EDIT">EDIT</button>
            </form>
        </Modal.Body>
      </Modal>
    )
}

function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [userdata, setUserData] = useState([]);
    const [rowData, setrowData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalUpdateShow, setModalUpdateShow] = useState(false);

    const handleChange = event => {
       setSearchTerm(event.target.value);
     };

     //for getting data from db
     useEffect(() => {
        Axios.get('http://localhost:3001/users/get').then((res) => {
            var data = res.data;
            const results = data.map(song =>
                song
            );
            setUserData(results);
        })

        const results = userdata.filter(user =>
            user.userName.toLocaleLowerCase().includes(searchTerm) ||
            user.lastName.toLocaleLowerCase().includes(searchTerm) ||
            user.firstName.toLocaleLowerCase().includes(searchTerm) ||
            user.email.toLocaleLowerCase().includes(searchTerm)
          );
          setSearchResults(results);
    }, [userdata])
     
    return (
        <React.Fragment>
            <Sidebar/>
            <Topbar/>        
            <div className = "UsersPage">
                <button className = "AddButton" onClick={() => setModalShow(true)}>ADD USER</button>
                <AddUserPage
                show={modalShow}
                onHide={() => setModalShow(false)}
                title = "ADD USER"
                />
                <input 
                    className = "SearchBar" 
                    type = "search" 
                    placeholder = "Search an user .."
                    value = {searchTerm}
                    onChange = {handleChange}
                />
                <table cellSpacing = "0" cellPadding = "0">
                    <tr className = "header">
                        <th className = "username">Username</th>
                        <th>Email Address</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                    </tr>
                    {searchResults.map((user, index) =>(
                        <tr className = "list" key = {index} onClick={() => {setrowData(user); setModalUpdateShow(true)}}>
                            <td id={user.keyId} >{user.userName}</td>
                            <td id={user.keyId} >{user.email}</td>
                            <td id={user.keyId} >{user.firstName}</td>
                            <td id={user.keyId} >{user.lastName}</td>
                            <td id={user.keyId} >{user.role}</td>
                            {modalUpdateShow ? <EditUserPage
                        show={modalUpdateShow}
                        onHide={() => setModalUpdateShow(false)}
                        title = "Edit USER"
                        userData = {rowData}
                        /> : <div />}
                            
                        </tr>
                        
                    ))}
                    
                    
                </table>
            </div>
        </React.Fragment>
    )
}

export default UsersPage
