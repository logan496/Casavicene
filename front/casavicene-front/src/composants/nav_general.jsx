import React from 'react';
import { NavLink } from 'react-router-dom';
import door from '../assets/door-open-solid.svg';
import print from '../assets/print-solid.svg';
import question from '../assets/question-solid.svg';
import fileplus from '../assets/file-medical-solid.svg';
import clipboard from '../assets/clipboard-list-solid.svg';
import '../style/nav_general.css';

function NavGeneral(props) {
    const { scaleValue } = props; // Destructure props to extract scaleValue
    return (
        <div className="nav-wrapper">
            <nav className="nav-general">
                <div className="nav__general">
                    <NavLink to="/out">
                        <img
                            className="nav-general-items"
                            src={door}
                            alt="Door Icon"
                        />
                    </NavLink>
                    <NavLink to="/briefcase">
                        <img
                            className="nav-general-items"
                            src={fileplus}
                            alt="Briefcase Icon"
                        />
                    </NavLink>
                    <div className="nav-icons-center">
                        <NavLink to="/">
                            <img
                                className="nav-general-items"
                                src={clipboard}
                                alt="Clipboard icon"
                            />
                        </NavLink>
                        <NavLink to="/print">
                            <img
                                className="nav-general-items"
                                src={print}
                                alt="Print Icon"
                            />
                        </NavLink>
                        <NavLink to="/question_tag">
                            <img
                                className="nav-general-items"
                                src={question}
                                alt="Question Icon"
                            />
                        </NavLink>
                    </div>
                    <NavLink to="/out">
                        <button className="export-button">export</button>
                    </NavLink>
                </div>
            </nav>
            <div className="nav-title">
                <h1>{scaleValue}</h1>
            </div>
        </div>
    );
}

export default NavGeneral;
