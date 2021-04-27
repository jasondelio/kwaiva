import React from 'react'
import "./UsersPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import {UsersMockData} from "./UsersMockData"

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
    return (
        <React.Fragment>
            <Sidebar/>
            <Topbar/>        
            <div className = "UsersPage">
                <button className = "AddButton">ADD USER</button>
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
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Role</th>
                    </tr>
                    {searchResults.map((user, index) =>(
                        <tr className = "list" key = {index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.lastname}</td>
                            <td>{user.firstname}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </React.Fragment>
    )
}

export default UsersPage
