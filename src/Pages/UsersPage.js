import React from 'react'
import "./UsersPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import {UsersMockData} from "./UsersMockData"
import Modal from 'react-bootstrap/Modal'
import { IoClose } from "react-icons/io5";

function AddUserPage(props) {
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
                    First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text"/>
                </p>
                <p>
                    Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text"/>
                </p>
                <p>
                    Username&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "text"/>
                </p>
                <p>
                    Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "email"/>
                </p>
                <p>
                    Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <input type = "password"/>
                </p>
                <p>
                    Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                    <select name="role" id="role">
                        <option value="admin">Admin</option>
                        <option value="fans">Fans</option>
                        <option value="musician">Musician</option>
                    </select>
                </p>
                <input type="submit" value="SUBMIT"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET"></input>
            </form>
        </Modal.Body>
      </Modal>
    )
}

function UsersPage() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
       const results = UsersMockData.filter(user =>
         user.username.toLocaleLowerCase().includes(searchTerm) ||
         user.lastname.toLocaleLowerCase().includes(searchTerm) ||
         user.firstname.toLocaleLowerCase().includes(searchTerm) ||
         user.email.toLocaleLowerCase().includes(searchTerm)
       );
       setSearchResults(results);
     }, [searchTerm]);
    const [modalShow, setModalShow] = React.useState(false);
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
                        <tr className = "list" key = {index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </React.Fragment>
    )
}

export default UsersPage
