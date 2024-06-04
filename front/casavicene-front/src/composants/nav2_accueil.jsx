import {NavLink} from "react-router-dom";

function nav2_accueil(){

    return(
        <nav className="nav2_accueil">
            <div className="nav2_container">
                <ul>
                    <li>
                        <NavLink to="/accueil" className="nav2-link">accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/infirmier" className="nav2-link">Infirmier</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Médécin" className="nav2-link">Médécin</NavLink>
                    </li>
                    <li>
                        <NavLink to="/labo" className="nav2-link">Labo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Radio" className="nav2-link">Radio</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default nav2_accueil