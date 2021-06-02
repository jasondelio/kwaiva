import React from 'react'
import "./DropdownMenu.css"
import Dropdown from 'react-bootstrap/Dropdown'
import { useHistory } from 'react-router-dom';
import LoggedInUser from '../Pages/LoggedInUser.js';

function DropdownMenu() {
    let history = useHistory();
    const click = async () => {
        try {
            await LoggedInUser.logout();

            history.push({ pathname: 'login' });
        } catch (e) {

        }
    };
    return (
        <div className="DropdownMenu">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown">
                    ADMIN&nbsp;&nbsp;<i class="Downarrow"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="menu" alignRight='true'>
                    <Dropdown.Item className="item" onClick={() => click()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DropdownMenu
