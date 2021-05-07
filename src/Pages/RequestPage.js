import React from 'react'
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import "./RequestPage.css";
function RequestPage() {
    return (
        <React.Fragment>
            <Sidebar/>
            <Topbar/>
            <div className = "RequestPage">
                <h1>THIS PAGE IS UNDER CONSTRUCTION</h1>
                <p>Please comeback later.</p>
            </div>
        </React.Fragment>

    )
}

export default RequestPage