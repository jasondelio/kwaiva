import React from 'react'
import "./Sidebar.css"
import { BiMusic } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import {CgNotes} from "react-icons/cg"

function Sidebar() {
    return (
        <div className="Sidebar">
            <img src="/Assets/kwaiva_logo.png" alt=""/>
            <ul className="SidebarList">
                <li className = "row" onClick = {() => { window.location.pathname = "/songs"}}>
                    <div className = "icon"><BiMusic/></div>
                    <div className = "title">SONGS</div>
                </li>
                <li className = "row" onClick = {() => { window.location.pathname = "/users"}}>
                    <div className = "icon"><FaRegUser/></div>
                    <div className = "title">USERS</div>
                </li>
                <li className = "row" onClick = {() => { window.location.pathname = "/request"}}>
                    <div className = "icon" ><CgNotes/></div>
                    <div className = "title">REQUEST</div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
