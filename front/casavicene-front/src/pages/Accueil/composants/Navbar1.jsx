import {NavLink} from "react-router-dom";
import {useState} from "react";

function Navbar1(){
    const [isNavOpen, setNavOpen] = useState(false)
    const toogleBar = () =>{
        setNavOpen(!isNavOpen);
    }

    return(
        <div className="nav-bar1-acceuill">
            <button className="dropdown-bar" onClick={toogleBar}>Fichier</button>
            {isNavOpen && (
                <ul>
                    <li>
                        <span>Paramètres Médicaux</span>
                        <ul className="submenu">
                            <li>
                                <NavLink to="/parametres-med/nomenclatures">Nomenclatures</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/Rubriques-soins">Rubriques de soins</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/familles-acte">Familles d'acte</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/actes">Actes</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/unites-med">Unités médicales</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/params-med">Paramètres médicaux</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/modeles-doc">Modèles de document</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/affections">Affections</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/gestes-soins">Gestes/ soins médicaux</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/vaccins">Vaccins</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/antecedents">Antécédents</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/mots-cles">Mots clés</NavLink>
                            </li>
                            <li>
                                <NavLink to="/parametres-med/nature-historique">Natures d'historique</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span>Paramétres Clients</span>
                        <ul className="submenu">
                            <li>
                                <NavLink to="/params-clients"></NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            )}

        </div>
    )
}

export default Navbar1