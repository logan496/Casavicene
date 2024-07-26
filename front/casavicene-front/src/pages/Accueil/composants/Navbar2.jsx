import {NavLink} from "react-router-dom";
import "../styles/Nabar2.css"
function Navbar2(){
    return (
        <div className="nav-accueil">
            <nav>
                <NavLink to={"/Accueil"} className="nav__accueil">Accueil</NavLink>
                <NavLink to={"/Infirmier"} className="nav__accueil">Infirmier</NavLink>
                <NavLink to={"/Medecin"} className="nav__accueil">Medécin</NavLink>
                <NavLink to={"/Labo"} className="nav__accueil">Labo</NavLink>
                <NavLink to={"/Radio"} className="nav__accueil">Radio</NavLink>
            </nav>
        </div>
    )
}

export default Navbar2