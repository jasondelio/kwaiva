import React from 'react'
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import "./NotFoundPage.css";
function NotFoundPage() {
    return (
        <React.Fragment>
            <Sidebar/>
            <Topbar/>
            <div className = "NotFoundPage">
                <h1>404: PAGE NOT FOUND</h1>
                <p>Unfortunately the page you're looking for doesn't exist (anymore) or there was an error in <br/> 
                the link you followed or typed.</p>
            </div>
        </React.Fragment>

    )
}

export default NotFoundPage