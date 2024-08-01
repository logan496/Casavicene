import Form_fiche from "./composants/form_fiche.jsx";
import Nav_general from "../../composants/nav_general.jsx";
import {NavLink} from "react-router-dom";
function fiche_signaletique(){
    return (
    <>
        <div className="nav-bar">
            <Nav_general scaleValue={"Fiche signaletique"}/>
        </div>
        <div className='fiche_signaletique'>
            <Form_fiche/>
        </div>
    </>
)
}

export default fiche_signaletique