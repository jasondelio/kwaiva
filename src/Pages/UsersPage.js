import React, { useEffect, useState }  from 'react'
import "./UsersPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CgSmileNone } from 'react-icons/cg';

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
    const [valid, setValid] = useState(true);
    const [userInfo, setuserInfo] = React.useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        role: 'admin'
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
        let userName = new FormData();

        userName.append('userName', userInfo.userName);
        for (var pair of userName.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }
        Axios({
            method: 'GET',
            url: "http://localhost:3001/users/getUserName",
            params: {userName : userInfo.userName},
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (res) {
            var data = res.data;
            console.log(data)
            if(data.length === 0) {
                setValid(true);
                console.log(valid)
            } else {
                setValid(false);
            }

        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
        
        if(valid)
        {
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

        history.go(0);
    }
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
                {valid == false && <p>User name already exist, please try other user name</p>}
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
    const history = useHistory();
    const [valid, setValid] = useState(true);
    const [selectedData, setSelectedData] = useState({
        keyId: props.userdata.keyId,
        firstName: props.userdata.firstName,
        lastName: props.userdata.lastName,
        userName: props.userdata.userName,
        email: props.userdata.email,
        password: props.userdata.password,
        role: props.userdata.role
    });
    const handleChange = (e) => {

        const target = e.target;
        var values = target.value;
        const name = target.name;
        if(values === null) {
            values = `props.userdata.${name}`;
        } else if (name === 'password') {
            var temp = compareHashed(values, `props.userdata.${name}`);
            values = temp;
        }
        setSelectedData({ ...selectedData, [name]: values });
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        // let userName = new FormData();

        // userName.append('userName', selectedData.userName);
        
        // Axios({
        //     method: 'GET',
        //     url: "http://localhost:3001/users/getUserName",
        //     params: {userName : selectedData.userName},
        //     headers: { "Content-Type": "multipart/form-data" },
        // }).then(function (res) {
        //     var data = res.data;
        //     console.log(data.length)
        //     if(data.length === 0) {
        //         setValid(true);
        //     } else {
        //         setValid(false);
        //     }

        // })
        // .catch(function (response) {
        //     //handle error
        //     console.log(response);
        // });
        // console.log(valid)
        
        // if(valid){
        let EditedUserdata = new FormData();

        EditedUserdata.append('firstName', selectedData.firstName);
        EditedUserdata.append('lastName', selectedData.lastName);
        EditedUserdata.append('userName', selectedData.userName);
        EditedUserdata.append('email', selectedData.email);
        EditedUserdata.append('password', selectedData.password);
        EditedUserdata.append('role', selectedData.role);
        EditedUserdata.append('keyId', props.userdata.keyId);
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
        history.go(0);
    // }
    };

    const handleDelete = (e) => {
        e.preventDefault()
        let DeleteUserdata = new FormData();
        DeleteUserdata.append('keyId', props.userdata.keyId);
        var server = 3001;
        Axios({
            method: 'POST',
            url: `http://localhost:${server}/users/delete`,
            data: DeleteUserdata,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            console.log(response);

        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
        history.go(0);
    };

    return (
        <Modal
        className = "ModalPage"
        {...props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className = "header">
            <IoClose className = "close" size={30} onClick={() => { history.go(0); }}/>
            <Modal.Title>
                <h4>{props.title}</h4> 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="/users/update" method="POST" onSubmit={(e) => handleSubmit(e)}>
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
                {/* {valid == false && <p>User name already exist, please try other user name</p>} */}
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
                <button type="edit" value="EDIT">EDIT</button>&nbsp;&nbsp;&nbsp;
                <button type="delete" value="DELETE" onClick={(e) => handleDelete(e)}>DELETE</button>
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
    const [sortTarget, setSortTarget] = useState("");
    const [sortTrigger, setTrigger] = useState(false);
    const [count, setCount] = useState({
        userName: 0,
        email: 0,
        firstName: 0,
        lastName: 0,
        role: 0
    });

    const handleChange = event => {
       setSearchTerm(event.target.value);
     };

     const trigger = (target) => {
        if(target % 2 === 0)
        {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
     }

     const handleEmailSort = (e, target) => {
        setSortTarget(target);
        setCount({ ...count, "email": count["email"] + 1 })
        trigger(count.email);
     }

     const handleFirstNameSort = (e, target) => {
        setSortTarget(target);
        setCount({ ...count, "firstName": count["firstName"] + 1 })
        trigger(count.firstName);

     }

     const handleLastNameSort = (e, target) => {
        setSortTarget(target);
        setCount({ ...count, "lastName": count["lastName"] + 1 })
        trigger(count.lastName);

     }

     const handleUserNameSort = (e, target) => {
        setSortTarget(target);
        setCount({ ...count, "userName": count["userName"] + 1 })
        trigger(count.userName);

     }

     const handleRoleSort = (e, target) => {
        setSortTarget(target);
        setCount({ ...count, "role": count["role"] + 1 })
        trigger(count.role);

     }

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
        // console.log(count);
        if(sortTrigger){
            var SortResult = searchResults.sort((a,b) => a[sortTarget] < b[sortTarget]  ? 1 : - 1 );
            setSearchResults(SortResult);
        }

          
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
                        <th onClick={(e) => handleUserNameSort(e, 'userName')}>Username</th>
                        <th onClick={(e) => handleEmailSort(e, 'email')}>Email Address</th>
                        <th onClick={(e) => handleFirstNameSort(e, 'firstName')}>First Name</th>
                        <th onClick={(e) => handleLastNameSort(e, 'lastName')}>Last name</th>
                        <th onClick={(e) => handleRoleSort(e, 'role')}>Role</th>
                    </tr>
                    {searchResults.map((user, index) =>(
                        <tr className = "list" key = {index} onClick={() => {setrowData(user); setModalUpdateShow(true)}}>
                            <td id={user.keyId} >{user.userName}</td>
                            <td id={user.keyId} >{user.email}</td>
                            <td id={user.keyId} >{user.firstName}</td>
                            <td id={user.keyId} >{user.lastName}</td>
                            <td id={user.keyId} >{user.role}</td>
                            {modalUpdateShow && <EditUserPage
                        show={modalUpdateShow}
                        onHide={() => setModalUpdateShow(false)}
                        title = "Edit USER"
                        userdata = {rowData}
                        />}
                            
                        </tr> 
                        
                    ))}
                    
                    
                </table>
            </div>
        </React.Fragment>
    )
}

export default UsersPage
