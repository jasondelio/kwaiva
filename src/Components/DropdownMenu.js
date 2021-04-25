import React from 'react'
import "./DropdownMenu.css"
import Dropdown from 'react-bootstrap/Dropdown'
function DropdownMenu() {
    return (
        <div className = "DropdownMenu">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className = "dropdown">
                  ADMIN&nbsp;&nbsp;<i class="Downarrow"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className = "menu" alignRight = 'true'>
                    <Dropdown.Item className = "item" href="login">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DropdownMenu
