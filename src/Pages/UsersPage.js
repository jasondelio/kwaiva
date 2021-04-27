import React from 'react'
import "./UsersPage.css"
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

function UsersPage() {
    return (
        <React.Fragment>
            <Sidebar/>
            <Topbar/>        
            <div className = "UsersPage">
                <button className = "AddButton">ADD USER</button>
                <input className = "SearchBar" type = "search" placeholder = "Search an user .."/>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Email Address</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Role</th>
                    </tr>
                </table>
            </div>
        </React.Fragment>
    )
}

export default UsersPage
