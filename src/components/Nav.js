import React, { useState, useEffect } from 'react';
import './Nav.css'

const Nav = () => {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 100 ? handleShow(true) : handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, [])

    return (
        <div className={`nav ${show && "nav-black"}`}>
            <img
                className="nav-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                alt="Netflix-logo"
            />
            <img
                className="nav-avatar"
                src="https://i.pinimg.com/originals/56/da/97/56da972967a4873ca1c2f7cdfb39d1ab.jpg"
                alt="Netflix-avatar"
            />
        </div>
    );
};

export default Nav;