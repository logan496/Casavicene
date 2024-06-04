import {useState} from "react";
import {NavLink} from 'react-router-dom'
function nav_acceuil(){

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }
    const [isSettingDropdownOpen, setIsFilesDropdownOpen] = useState(false)
    const toggleSettingsDropdown = () => {
        setIsFilesDropdownOpen(!isSettingDropdownOpen)
    }

    const [isSettingClientDropdowOpend, setIsClientDropdownOpen] = useState(false)
    const toggleClientSettingDropdown = () => {
        setIsClientDropdownOpen(!isSettingClientDropdowOpend)
    }

    return(
        <nav className="nav_acceuil">
            <div className="nav_acceuil-container">
                <ul>
                    <li>
                        <NavLink to="/" onClick={toggleDropdown} className="nav_acceuil-link">
                            Fichiers
                        </NavLink>
                        {isDropdownOpen && (
                            <ul>
                                <li>
                                    <NavLink to="/medical" onClick={toggleSettingsDropdown}
                                             className="nav_fichier-link">Paremètes Médicaux</NavLink>
                                    {isSettingDropdownOpen && (
                                        <ul>
                                            <li>
                                                <NavLink to="/Nomenclatures">Nomenclatures</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/rubrq_soins">Rubriques de soins</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/fmll_acte">Famille d'acte</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/actes">Actes</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/unite_medicale">Unités médicales</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/medical_setting">Paramétres médicaux</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/model_document">Modéles de document</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/affectiond">affections</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/gestes_soins médicaux">Gestes/soins médicaux</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/vaccins">Vaccins</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/antecedents">Antécédents</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/keys_word">Mots clés</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/Nomenclatures">Nomenclatures</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/natures_historique">Natures d'historique</NavLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <NavLink to="/client_setting">Paramétres clients</NavLink>
                                </li>
                                {isSettingClientDropdowOpend&& (
                                    <ul>
                                        <li>
                                            <NavLink to="/"></NavLink>
                                        </li>
                                    </ul>
                                )}
                                <li>
                                    <NavLink to="/articles_setting">¨Paramétres Articles</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/equipment_setting">Paramétres équipements</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout">Disconnect</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/change_password">Changer le mot de passe</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/quit">Quitter</NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <NavLink to="/medical">Médical</NavLink>
                    </li>
                    <li>
                        <NavLink to="/achat_stock">Achat/Stock</NavLink>
                    </li>
                    <li>
                        <NavLink to="/medical">Favoris</NavLink>
                    </li>
                    <li>
                        <NavLink to="/medical">X-App's</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default nav_acceuil