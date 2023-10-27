import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        Task Manager
                    </Link>
                    </div>
                    <div className="links">
      
                </div>
            </div>
        </div>
    )
}


export default Header;